# **************************************************************************
# *
# Copyright (c) 2015 * 
# Ling Ma <bitly.com/cvlingma> * 
# *
# This program is free software; you can redistribute it and/or modify *
# it under the terms of the GNU Lesser General Public License (LGPL) *
# as published by the Free Software Foundation; either version 2 of *
# the License, or (at your option) any later version. *
# for detail see the LICENCE text file. *
# *
# This program is distributed in the hope that it will be useful, *
# but WITHOUT ANY WARRANTY; without even the implied warranty of *
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the *
# GNU Library General Public License for more details. *
# *
# You should have received a copy of the GNU Library General Public *
# License along with this program; if not, write to the Free Software *
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 *
# USA *
# *
# **************************************************************************

__author__ = 'ling'

from flask import Blueprint
from project import app

auth0_blueprint = Blueprint(
    'auth0', __name__,
    template_folder='templates'
)

import os
import json

import requests
from flask import Flask, request, jsonify, session, redirect, render_template, send_from_directory

# Here we're using the /callback route.
@auth0_blueprint.route('/callback')
def callback_handling():
  if app.config['TESTING']:
    return redirect('/')
  code = request.args.get('code')

  json_header = {'content-type': 'application/json'}

  token_url = "https://{domain}/oauth/token".format(domain=app.config['AUTH0_DOMAIN'])

  token_payload = {
    'client_id':     app.config['AUTH0_CLIENT_ID'],
    'client_secret': app.config['AUTH0_CLIENT_SECRET'],
    'redirect_uri':  app.config['AUTH0_CALLBACK_URL'],
    'code':          code,
    'grant_type':    'authorization_code'
  }

  token_info = requests.post(token_url, data=json.dumps(token_payload), headers = json_header).json()

  user_url = "https://{domain}/userinfo?access_token={access_token}" \
      .format(domain=app.config['AUTH0_DOMAIN'], access_token=token_info['access_token'])

  user_info = requests.get(user_url).json()

  # We're saving all user information into the session
  session['profile'] = user_info

  # Redirect to the User logged in page that you want here
  # In our case it's /dashboard
  return redirect('/')
  

# Controllers API
@auth0_blueprint.route("/login")
def login():
  if app.config['TESTING']:
    return redirect('/')
  env = {
    'client_id':     app.config['AUTH0_CLIENT_ID'],
    'client_secret': app.config['AUTH0_CLIENT_SECRET'],
    'redirect_uri':  app.config['AUTH0_CALLBACK_URL'],
    'auth_domain':  app.config['AUTH0_DOMAIN']
  }
  return render_template('login.html',env=env)
  
@auth0_blueprint.route("/logout")
def logout():
  if app.config['TESTING']:
    return redirect('/')
  session.clear()
  requests.get("https://"+app.config['AUTH0_DOMAIN']+"/v2/logout")
  return redirect('/login')