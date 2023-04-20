from flask import Flask
from app.apiGenerator.generator import generator;

app = Flask(__name__)

@app.route('/')
def hello_world():
    api = generator("create api with methods GET AND delete")
    return api;

if __name__ == '__main__':
    app.run(debug=True)