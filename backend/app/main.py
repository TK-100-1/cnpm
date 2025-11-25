from fastapi import FastAPI
from app.routers import user_router, mentor_router, auth_router

app = FastAPI(title="Tutor-Mentor API")

app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(mentor_router.router)

@app.get("/")
def root():
    return {"message": "Tutor-Mentor API running"}
