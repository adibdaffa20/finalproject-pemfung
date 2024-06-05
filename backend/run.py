from app import create_app

app = create_app()
app.config['SECRET_KEY'] = 'secret11'

if __name__ == "__main__":
    app.run(debug=True)
