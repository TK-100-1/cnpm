from pydantic import BaseModel
from typing import List

class ClassItem(BaseModel):
    id: int
    mentor_id: int
    mentees: List[int]
    status: str | None = None
