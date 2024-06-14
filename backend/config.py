import os


class Config:
    DB_ADAPTER = os.environ.get('DB_ADAPTER', 'mysql+pymysql://')
    DB_USERNAME = os.environ.get('DB_USERNAME', 'root')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', 'Password123%23%40%21')
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_NAME = os.environ.get('DB_NAME', 'management_tugas')

    SQLALCHEMY_DATABASE_URI = f"{DB_ADAPTER}{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
