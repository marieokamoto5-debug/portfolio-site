from fastapi import APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from auth import require_admin, verify_firebase_token

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

@router.get("/auth/admin-check")
def check_admin(user=Depends(require_admin)):
    return {
        "uid": user["uid"],
        "email": user.get("email"),
        "admin": user.get("admin",)
    }