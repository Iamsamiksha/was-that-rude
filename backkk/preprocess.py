import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer

# Load data
df = pd.read_csv("train.csv")

# Keep only necessary columns
X = df["comment_text"]
y = df[["toxic", "severe_toxic", "obscene", "threat", "insult", "identity_hate"]]

# Split into train and test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Declare global variables
X_train_vec = X_test_vec = vectorizer = None

def preprocess():
    global X_train_vec, X_test_vec, vectorizer
    vectorizer = TfidfVectorizer(max_features=10000, stop_words='english')
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

# Run preprocessing
preprocess()

# Export variables for use in other files
__all__ = ['X_train_vec', 'X_test_vec', 'y_train', 'y_test', 'vectorizer']

# Optional: print shapes
print("Train size:", X_train.shape[0])
print("Test size:", X_test.shape[0])
print("Vectorized shape:", X_train_vec.shape)
