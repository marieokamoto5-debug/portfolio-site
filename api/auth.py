from fastapi import HTTPException
from firebase_admin import auth

import firebase_config

def verify_firebase_token(id_token: str):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print(type(e).__name__)
        print(e)

        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token",
        )