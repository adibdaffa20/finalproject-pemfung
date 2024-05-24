from app.extensions import db


class Tugas(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(80), nullable=False)
    deskripsi = db.Column(db.String(200), nullable=False)
    deadline = db.Column(db.DateTime, nullable=False)
    kategori = db.Column(db.String(50), nullable=False)
    is_done = db.Column(db.Boolean, default=False)
