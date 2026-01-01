from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel

from core.config import settings
from db.session import engine
from routers import auth, upload, categories, products


# --------------------
# App initialization
# --------------------
app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
)


# --------------------
# CORS
# --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------
# Database
# --------------------
@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)


# --------------------
# Routers
# --------------------
app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(categories.router)
app.include_router(products.router)


# --------------------
# Health check
# --------------------
@app.get("/")
def root():
    return {"status": "ok"}