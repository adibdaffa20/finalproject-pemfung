from .routes import api_blueprint
from flask import Flask


def init_api(app: Flask):
    app.register_blueprint(api_blueprint, url_prefix='/api')
