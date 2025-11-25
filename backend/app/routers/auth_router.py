from fastapi import APIRouter
from app.schemas.auth_schema import LoginRequest
from app.services.auth_service import AuthService

router = APIRouter(prefix="/auth", tags=["Authentication"])
service = AuthService()


@router.post("/login")
def login(data: LoginRequest):
    return service.login(data)
