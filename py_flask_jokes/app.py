from flask import Flask, request, render_template, make_response,redirect, url_for, send_from_directory
import pyjokes
import random

app = Flask(__name__)

@app.route('/', methods=["GET", "POST"])#decorator
def joke_form():
    if request.method=="GET":
        return render_template("joke_form.html")
    else:
        cat = request.form['cat']
        lang = request.form['lang']
        amount = request.form['amount']
        if int(amount)>1:
            try:
                jokes=pyjokes.get_jokes(lang, cat)
            except:
                error=["Category not found in this language. Please try another."]
                return render_template("joke_form.html", jokes=error)
            jokes_list=[]
            for i in range(int(amount)):
                try:
                    jokes_list.append(jokes[i])
                except:
                    jokes_list=["We do not have that many jokes. Please try again with a lower number."]
                    break

            return render_template("joke_form.html", jokes=jokes_list)
        else:
            joke=pyjokes.get_joke(lang, cat)
            return render_template("joke_form.html", jokes=joke)


#source .venv/bin/activate
#flask run
