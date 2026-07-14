import os


def get_int(name: str, default: int) -> int:
    v = os.getenv(name)
    if v is None or v == '':
        return default
    try:
        return int(v)
    except ValueError:
        return default


def get_bool(name: str, default: bool = False) -> bool:
    v = os.getenv(name)
    if v is None:
        return default
    return v.lower() in ('1', 'true', 'yes', 'on')


class Config:
    # DB
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    DATABASE_URL = os.getenv(
        'DATABASE_URL',
        'postgresql+psycopg2://bxtech:bxtech@localhost:5432/bxtech',
    )

    # JWT
    JWT_SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'change-me')
    JWT_TOKEN_LOCATION = ['headers']

    # CORS
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:5173')

    # Seed behavior
    SEED_DB_ON_STARTUP = get_bool('SEED_DB_ON_STARTUP', True)

