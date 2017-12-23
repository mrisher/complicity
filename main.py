import logging, base64, os
from flask import Flask, render_template, request
from flask_talisman import Talisman, GOOGLE_CSP_POLICY
app = Flask(__name__)

# Set up Talisman for app security and CSP
Talisman(app, content_security_policy=GOOGLE_CSP_POLICY)


@app.route('/form')
def form():
    return render_template('form.html')

@app.route('/submitted', methods=['POST'])
def submitted_form():
    name = request.form['name']
    email = request.form['email']
    site = request.form['site_url']
    comments = request.form['comments']
    return render_template(
        'submitted_form.html',
        name=name,
        email=email,
        site=site,
        comments=comments)

@app.route('/')
def homepage():
    return render_template('index.html')

@app.route('/app')
@app.route('/app/<int:index>')
def prototype(index=0):
    screen_seq = [
        'griggs', 'plane_view', 'compass', 'meter', 'reticle', 'griggs', 'apps', 'meter'] 
    # find the screen
    return render_template('screen.html',
        screen=screen_seq[index],
        next = index+1)

