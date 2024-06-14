from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash


class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Tugas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(80), nullable=False)
    deskripsi = db.Column(db.String(200), nullable=False)
    deadline = db.Column(db.String(50), nullable=False)
    kategori = db.Column(db.String(50), nullable=False)
    is_done = db.Column(db.Boolean, default=False)
