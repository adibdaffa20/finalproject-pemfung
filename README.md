# Konfigurasi Backend

Ikuti langkah-langkah berikut untuk mengatur dan menjalankan server backend:

## 1. Membuat Virtual Environment

Buat virtual environment untuk mengisolasi dependensi proyek Anda.

```sh
python -m venv venv
```

## 2. Instal Dependensi

Aktifkan virtual environment Anda dan instal semua paket yang diperlukan dari `requirements.txt`.

```sh
source venv/bin/activate  # Pada Windows gunakan `venv\Scripts\activate`
pip install -r requirements.txt
```

## 3. Konfigurasi Database

Atur konfigurasi database Anda di `config.py`. Pastikan semua pengaturan yang diperlukan (seperti URI database) telah ditentukan dengan benar.

## 4. Migrasi Database

Inisialisasi dan migrasikan database menggunakan Flask-Migrate.

```sh
flask db init
flask db migrate -m "Initial migration."
flask db upgrade
```

## 5. Menjalankan Aplikasi Flask

Mulai server pengembangan Flask.

```sh
flask run
```
