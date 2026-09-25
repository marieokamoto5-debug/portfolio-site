from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from auth import verify_firebase_token

router = APIRouter()

security = HTTPBearer()

@router.get("/auth/check")
def check_auth(
    credentials: HTTPAuthorizationCredentials = Depends(security),

):
    user = verify_firebase_token(credentials.credentials)

    return {
        "uid": user["uid"],
        "email": user.get("email"),
        "admin": user.get("admin", False),
    }