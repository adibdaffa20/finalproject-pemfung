from flask import Blueprint, request, jsonify, session, g
from app.extensions import db
from app.models.models import Tugas, Account

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/', methods=['GET'])
def index():
    return {"message": "Welcome to the API"}


@api_blueprint.before_request
def require_login():
    if request.endpoint != 'api.login' and request.endpoint != 'api.register' and request.endpoint != 'api.index':
        if 'user_id' not in session:
            return jsonify({'error': 'Authentication required'}), 401
        g.user = Account.query.get(session['user_id'])
        if g.user is None:
            return jsonify({'error': 'Invalid session or user not found'}), 401


@api_blueprint.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400
    account = Account.query.filter_by(username=username).first()
    if account and account.check_password(password):
        session['user_id'] = account.id
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'error': 'Invalid username or password'}), 401


@api_blueprint.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    # Check if username already exists
    if Account.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    # Create new account and hash the password
    new_account = Account(username=username)
    new_account.set_password(password)
    db.session.add(new_account)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201


@api_blueprint.route('/logout', methods=['POST'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200


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
