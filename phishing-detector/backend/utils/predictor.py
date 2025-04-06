import pandas as pd
from urllib.parse import urlparse
import re
import whois
import datetime
import socket
import requests
from bs4 import BeautifulSoup

def predict(model, url):
    features = extract_features(url)
    expected = model.feature_names_in_
    features = features.reindex(columns=expected, fill_value=-1)
    prediction = model.predict(features)
    return prediction[0]

def extract_features(url):
    parsed_url = urlparse(url)

    features = {
        "UsingIP": 1 if re.match(r"\d+\.\d+\.\d+\.\d+", parsed_url.netloc) else -1,
        "LongURL": 1 if len(url) > 75 else 0 if len(url) > 54 else -1,
        "ShortURL": 1 if any(short in url for short in ["bit.ly", "tinyurl"]) else -1,
        "Symbol@": 1 if "@" in url else -1,
        "Redirecting//": 1 if url[7:].find("//") != -1 else -1,
        "PrefixSuffix-": 1 if "-" in parsed_url.netloc else -1,
        "SubDomains": 1 if parsed_url.netloc.count('.') > 2 else 0 if parsed_url.netloc.count('.') == 2 else -1,
        "HTTPS": 1 if parsed_url.scheme == "https" else -1,
        "DomainRegLen": get_domain_age(url),
        "NonStdPort": 1 if ":" in parsed_url.netloc else -1,
        "HTTPSDomainURL": 1 if "https" in parsed_url.netloc else -1,
        "RequestURL": get_anchor_url_ratio(url),
        "AnchorURL": get_anchor_url_ratio(url),
        "LinksInScriptTags": check_status_bar(url),
        "ServerFormHandler": 0,
        "InfoEmail": 1 if "@" in url else -1,
        "AbnormalURL": check_abnormal_url(url),
        "WebsiteForwarding": 0,
        "StatusBarCust": check_status_bar(url),
        "DisableRightClick": 0,
        "UsingPopupWindow": -1,
        "IframeRedirection": get_iframe_redirection(url),
        "AgeofDomain": get_domain_age(url),
        "DNSRecording": get_dns_record(url),
        "WebsiteTraffic": -1,
        "PageRank": -1,
        "GoogleIndex": 1,
        "LinksPointingToPage": -1,
        "StatsReport": 0,
    }

    return pd.DataFrame([features])

# --- Helper Functions ---

def get_domain_age(url):
    try:
        domain_info = whois.whois(url)
        creation_date = domain_info.creation_date
        if isinstance(creation_date, list):
            creation_date = creation_date[0]
        age_days = (datetime.datetime.now() - creation_date).days if creation_date else 0
        return 1 if age_days > 365 else -1
    except:
        return -1

def get_dns_record(url):
    try:
        socket.gethostbyname(urlparse(url).netloc)
        return 1
    except:
        return -1

def check_abnormal_url(url):
    suspicious = ["login", "bank", "secure", "verify", "update"]
    return 1 if any(w in url.lower() for w in suspicious) else -1

def get_anchor_url_ratio(url):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        anchors = soup.find_all("a")
        external = [a for a in anchors if a.get("href") and not a.get("href").startswith(url)]
        ratio = len(external) / len(anchors) if anchors else 0
        return 1 if ratio > 0.7 else 0 if ratio > 0.3 else -1
    except:
        return -1

def check_status_bar(url):
    try:
        response = requests.get(url, timeout=5)
        return 1 if "onmouseover" in response.text.lower() else -1
    except:
        return -1

def get_iframe_redirection(url):
    try:
        response = requests.get(url, timeout=5)
        soup = BeautifulSoup(response.text, "html.parser")
        return 1 if soup.find_all("iframe") else -1
    except:
        return -1
