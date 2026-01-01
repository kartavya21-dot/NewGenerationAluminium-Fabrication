from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    # --------------------
    # App
    # --------------------
    APP_NAME: str = "Shop Backend"
    DEBUG: bool = False

    # --------------------
    # Database
    # --------------------
    DATABASE_URL: str = Field(
        ...,
        description="PostgreSQL / SQLite database connection URL"
    )

    # --------------------
    # JWT Auth
    # --------------------
    JWT_SECRET_KEY: str = Field(..., description="JWT secret key")
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24   # 1 day

    # --------------------
    # ImageKit
    # --------------------
    IMAGEKIT_PUBLIC_KEY: str
    IMAGEKIT_PRIVATE_KEY: str
    IMAGEKIT_URL_ENDPOINT: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


# Singleton settings object
settings = Settings()