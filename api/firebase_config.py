from pathlib import Path

import firebase_admin
from firebase_admin import credentials

render_secret = Path("/etc/secrets/firebase-service-account.json")
local_secret = Path(__file__).resolve().parent / "secrets/firebase-service-account.json"

service_account_path = render_secret if render_secret.exists() else local_secret

cred = credentials.Certificate(service_account_path)
firebase_admin.initialize_app(cred)
