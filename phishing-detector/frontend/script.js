// Clear result when typing new URL
document.getElementById("urlInput").addEventListener("input", () => {
  const resultDiv = document.getElementById("result");
  resultDiv.className = "result-container";
  resultDiv.innerHTML = "";
});

function checkPhishing() {
  const url = document.getElementById("urlInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!url) {
    resultDiv.className = "result-container show unsafe";
    resultDiv.innerHTML = "<p>❌ Please enter a URL to check.</p>";
    return;
  }

  // Show loading state
  resultDiv.className = "result-container show";
  resultDiv.innerHTML = "<p>⏳ Analyzing URL...</p>";

  fetch("https://QuantumShield.pythonanywhere.com/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  })
    .then(res => res.json())
    .then(data => {
      if (data.phishing === -1) {
        resultDiv.className = "result-container show unsafe";
        resultDiv.innerHTML = `
          <p>⚠️ Warning: This URL appears to be a phishing site!</p>
          <p style="font-size: 14px; margin-top: 10px;">We recommend not visiting this URL as it may be attempting to steal your personal information.</p>
        `;
      } else {
        resultDiv.className = "result-container show safe";
        resultDiv.innerHTML = `
          <p>✅ This URL appears to be safe.</p>
          <p style="font-size: 14px; margin-top: 10px;">While this URL appears legitimate, always exercise caution when visiting new websites.</p>
        `;
      }
    })
    .catch(err => {
      console.error("Error:", err);
      resultDiv.className = "result-container show unsafe";
      resultDiv.innerHTML = `
        <p>🚫 Error checking the URL.</p>
        <p style="font-size: 14px; margin-top: 10px;">Please try again later or contact support if the problem persists.</p>
      `;
    });
}
