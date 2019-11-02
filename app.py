from flask import Flask, request, render_template, make_response

app = Flask(__name__)

@app.route('/')
def make_sheet():
    return render_template('home.html')