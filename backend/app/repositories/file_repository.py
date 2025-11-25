import json
from pathlib import Path
from filelock import FileLock

class FileRepository:
    file_path: str = ""

    def _ensure_file(self):
        p = Path(self.file_path)
        p.parent.mkdir(parents=True, exist_ok=True)
        if not p.exists():
            p.write_text("[]", encoding="utf-8")

    def get_all(self):
        self._ensure_file()
        lock = FileLock(f"{self.file_path}.lock")
        with lock:
            with open(self.file_path, "r", encoding="utf-8") as f:
                return json.load(f)

    def save_all(self, data):
        self._ensure_file()
        lock = FileLock(f"{self.file_path}.lock")
        with lock:
            with open(self.file_path, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=4, ensure_ascii=False)


