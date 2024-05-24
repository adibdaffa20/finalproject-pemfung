from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.models import Tugas

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/', methods=['GET'])
def index():
    return {"message": "Welcome to the API"}


@api_blueprint.route('/tugas', methods=['POST'])
def add_tugas():
    data = request.get_json()
    new_tugas = Tugas(
        nama=data['nama'],
        deskripsi=data['deskripsi'],
        deadline=data['deadline'],
        kategori=data['kategori'],
        is_done=False
    )
    db.session.add(new_tugas)
    db.session.commit()
    return jsonify({"message": "Tugas added successfully"}), 201


@api_blueprint.route('/tugas/<int:tugas_id>', methods=['DELETE'])
def delete_tugas(tugas_id):
    tugas = Tugas.query.get(tugas_id)
    if tugas:
        db.session.delete(tugas)
        db.session.commit()
        return jsonify({"message": "Tugas deleted successfully"}), 200
    return jsonify({"message": "Tugas not found"}), 404


@api_blueprint.route('/tugas/<int:tugas_id>', methods=['GET'])
def get_tugas(tugas_id):
    tugas = Tugas.query.get(tugas_id)
    if tugas:
        return jsonify({
            "id": tugas.id,
            "nama": tugas.nama,
            "deskripsi": tugas.deskripsi,
            "deadline": tugas.deadline,
            "kategori": tugas.kategori,
            "is_done": tugas.is_done
        })
    return jsonify({"message": "Tugas not found"}), 404
