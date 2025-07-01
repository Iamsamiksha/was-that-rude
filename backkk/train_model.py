import joblib
from sklearn.linear_model import LogisticRegression
from sklearn.multioutput import MultiOutputClassifier
from sklearn.metrics import classification_report
import preprocess

# Access preprocessed data
X_train_vec = preprocess.X_train_vec
X_test_vec = preprocess.X_test_vec
y_train = preprocess.y_train
y_test = preprocess.y_test
vectorizer = preprocess.vectorizer

# Train model
base_model = LogisticRegression(max_iter=1000)
model = MultiOutputClassifier(base_model)
model.fit(X_train_vec, y_train)

# Predict and show report
y_pred = model.predict(X_test_vec)
report = classification_report(y_test, y_pred, zero_division=0)
print(report)

# Save model and vectorizer
joblib.dump(model, "model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")
from sklearn.metrics import accuracy_score

# For multi-label, accuracy means exact match
exact_accuracy = accuracy_score(y_test, y_pred)
print(f"Exact Match Accuracy: {exact_accuracy:.4f}")