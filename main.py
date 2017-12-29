import logging, base64, os, re
from flask import Flask, render_template, request, current_app
from flask_talisman import Talisman, GOOGLE_CSP_POLICY
app = Flask(__name__, static_folder='vue-project/dist')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

# Set up Talisman for app security and CSP
#talisman = Talisman(app, content_security_policy=GOOGLE_CSP_POLICY)

# Generate a Nonce for CSP inline script blocks
def GetCspNonce():
    """Returns a random nonce."""
    NONCE_LENGTH = 16
    return base64.b64encode(os.urandom(NONCE_LENGTH))

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
@app.route('/app/<int:start>')
def run_prototype(start = 0):
    #script_src = re.sub(r'\'nonce-.*\'', '', talisman.content_security_policy['script-src'])
    nonce = GetCspNonce();
    #script_src = script_src + ' \'nonce-{}\' '.format(nonce)
    #logging.debug("script_src = '{}'".format(script_src))
    #talisman.content_security_policy['script-src'] = script_src 
    return render_template('scene.html', start=start, nonce=nonce)

@app.route('/vue')
def run_vue():
    return current_app.send_static_file('index.html')

