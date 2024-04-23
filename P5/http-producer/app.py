import json

from flask import Flask, redirect, render_template, url_for, request, flash, session
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_HEADERS'] = 'Connection'
app.config['SECRET_KEY'] = 'dev'


@app.route('/')
def hello_world():
    return redirect(url_for('login'))


@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    if session.get('user_id') != None:
        print(session.get('user_id'))
        return json.dumps({'user': session['user_id']})
    if request.method == 'GET':
        print("No User")
        return json.dumps({'user': None})
    name = request.json.get('name', None)
    passwd = request.json.get('password', None)
    if name == 'ferfong' and passwd == '123': #Ustedes van a tener que cambiar esto, por una validación con la DB.
        session['user_id'] = name #definición de cookie de sesión.
        print("Log")
        print(session.get('user_id'))
        return json.dumps({'user': session['user_id']})
    print("Invalid")
    return json.dumps({'user': None})


@app.route('/logout')
def logout():
    print(session['user_id'])
    session['user_id'] = None
    return json.dumps({'user': None})


if __name__ == '__main__':
    app.run(debug = True)
