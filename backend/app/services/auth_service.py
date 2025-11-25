from fastapi import HTTPException
from app.repositories.user_repository import UserRepository
from app.schemas.auth_schema import LoginRequest
from app.utils.jwt_utils import create_token

class AuthService:

    def __init__(self):
        self.user_repo = UserRepository()

    def login(self, data: LoginRequest):
        user = self.user_repo.find_by_username(data.username)

        if not user:
            raise HTTPException(status_code=400, detail="User not found")

        if user["password"] != data.password:
            raise HTTPException(status_code=400, detail="Invalid password")

        token = create_token({
            "id": user["id"],
            "role": user["role"],
            "username": user["username"]
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "name": user["name"],
                "role": user["role"]
            }
        }

    def logout(self):
        pass  # Typically handled on client side by deleting token