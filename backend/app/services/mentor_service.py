from app.repositories.class_repository import ClassRepository

class MentorService:
    def __init__(self):
        self.class_repo = ClassRepository()

    def open_class(self, mentor_id: int) -> dict:
        classes = self.class_repo.get_all()
        new_id = (max([c["id"] for c in classes]) + 1) if classes else 1
        new_class = {"id": new_id, "mentor_id": mentor_id, "mentees": [], "status": "created"}
        classes.append(new_class)
        self.class_repo.save_all(classes)
        return new_class
