from fastapi import APIRouter
from app.services.user_service import UserService

router = APIRouter(prefix="/users", tags=["Users"])
service = UserService()

@router.get("/")
def list_users():
    return service.get_users()
