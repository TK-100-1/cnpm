from app.repositories.file_repository import FileRepository

class UserRepository(FileRepository):
    file_path = "app/data/users.json"

    def find_by_username(self, username: str):
        users = self.get_all()
        for user in users:
            if user["username"] == username:
                return user
        return None
