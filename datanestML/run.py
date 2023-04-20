from flask import Flask
from app.apiGenerator.generator import generator;

app = Flask(__name__)

@app.route('/')
def hello_world():
    api = generator("What is the difference between the GET and POST methods for the /search endpoint of the Twitter API?")
    return api;

if __name__ == '__main__':
    app.run(debug=True)