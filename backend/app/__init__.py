from flask import Flask
from config import Config
from app.extensions import db, migrate
from app.api import init_api


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    # Register the API blueprint
    init_api(app)

    @app.route('/')
    def hello():
        return "Hello, World!"

    return app
