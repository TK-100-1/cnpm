from fastapi import APIRouter
from app.services.mentor_service import MentorService

router = APIRouter(prefix="/mentors", tags=["Mentors"])
service = MentorService()

@router.post("/{mentor_id}/open-class")
def open_class(mentor_id: int):
    new_class = service.open_class(mentor_id)
    return {"message": "class created", "class": new_class}
