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


# Define the sequence of scenes (and audio)
scenes = [
    {'image': 'griggs', 'audio': 'audio-001'},
    {'image': 'plane_view', 'audio': 'audio-002'},
    'griggs-alt', 'compass', 'meter', 'reticle', 'griggs', 'apps', 'meter'] 


@app.route('/app')
@app.route('/app/<int:index>')
def prototype(index=0):
    # find the scene
    scene=scenes[index]
    image=None
    audio=None
    if (isinstance(scene, dict)):
        image = scene['image']
        audio = scene['audio']
    elif (isinstance(scene, str)):
        image = scene
    else:
        raise TypeError('"scenes" array contains invalid type {}'.format(type(scene)))
    
    return render_template('scene.html',
        image=image,
        audio=audio,
        next = index+1)

