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

from flask import Flask
app = Flask(__name__)
import os
app.config.from_object(os.environ['APP_SETTINGS'])
from project.home.views import home_blueprint
app.register_blueprint(home_blueprint)
from project.upload.views import upload_blueprint
app.register_blueprint(upload_blueprint)
from project.auth0.views import auth0_blueprint
app.register_blueprint(auth0_blueprint)
# from project.viewer.views import viewer_blueprint
# app.register_blueprint(viewer_blueprint)


# from project.login.views import login_blueprint

# # register our blueprints
# app.register_blueprint(login_blueprint)
