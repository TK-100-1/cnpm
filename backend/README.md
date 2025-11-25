# 📘 Tutor/Mentor Support System – Backend (FastAPI)

Hệ thống hỗ trợ học tập giữa **Mentor – Mentee – Điều phối viên – Nhà trường**, được xây dựng bằng **FastAPI**, sử dụng **file JSON làm nơi lưu trữ dữ liệu** (không dùng database).  
Kiến trúc tách rõ ràng theo các tầng:

- **Router** – API endpoint
- **Service** – Xử lý nghiệp vụ
- **Repository** – Tương tác dữ liệu JSON
- **Schemas** – Kiểm soát input/output
- **Utils** – JWT, Auth, File utils

---

---

## 1️⃣ Clone dự án

```bash
git clone <repo-url>
cd backend
```

## 2️⃣ Cài đặt dependencies

```bash
pip install -r requirements.txt
```

## 3️⃣ Tạo virtual environment

### macOS / Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate # macOS / Linux
```

### Windows:

```bash
python -m venv .venv
.venv\Scripts\activate
```

### Chạy FastAPI server

```bash
uvicorn app.main:app --reload
```
