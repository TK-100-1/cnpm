from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from app.utils.jwt_utils import decode_token

security = HTTPBearer()

def require_user(credentials = Depends(security)):
    token = credentials.credentials
    data = decode_token(token)
    if not data:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return data

def require_admin(user_data = Depends(require_user)):
    if user_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin privileges required")
    return user_data