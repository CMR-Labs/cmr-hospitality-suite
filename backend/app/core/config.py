from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    APP_NAME: str = "CMR Hospitality Suite"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"

    class Config:
        env_file = ".env"

settings = Settings()