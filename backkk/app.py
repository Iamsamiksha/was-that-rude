from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

app = Flask(__name__)
CORS(app)  # Allow frontend access

# Load model and vectorizer
model = joblib.load("model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    comment = data.get("comment", "")
    if not comment:
        return jsonify({"error": "No comment provided"}), 400

    vec = vectorizer.transform([comment])
    preds = model.predict(vec)[0]

    labels = ["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]
    result = dict(zip(labels, preds.tolist()))
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
