from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.model_loader import load_model
from utils.predictor import predict

app = Flask(__name__)
CORS(app)

# Load the model when the app starts
model = load_model()

@app.route('/predict', methods=['POST'])
def predict_url():
    data = request.get_json()
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        result = predict(model, url)
        return jsonify({"phishing": int(result)})
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return jsonify({"error": "Prediction failed"}), 500