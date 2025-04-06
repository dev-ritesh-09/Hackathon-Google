import os
import pickle

def load_model():
    model_path = os.path.join(os.path.dirname(__file__), "phishing_model.pkl")
    try:
        with open(model_path, "rb") as f:
            model = pickle.load(f)
        print("✅ Model loaded successfully.")
        return model
    except FileNotFoundError:
        print(f"❌ Model file not found at: {model_path}")
        raise
    except Exception as e:
        print(f"❌ Error loading model: {e}")
        raise
