from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth

import firebase_config

security = HTTPBearer()

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

def require_admin(
        credentials: HTTPAuthorizationCredentials = Depends(security),
):
    user = verify_firebase_token(credentials.credentials)

    if not user.get("admin", False):
        raise HTTPException(
            status_code=403,
            detail="Admin permission required",
        )
    return user