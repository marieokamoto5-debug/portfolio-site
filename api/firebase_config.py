from pathlib import Path

import firebase_admin
from firebase_admin import credentials

service_account_path = (
    Path(__file__).resolve().parent
    / "secrets"
    / "firebase-service-account.json"
)

cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)