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
# t=OCC.BRepTools
import OCC.BRepTools
# from project.OCC.BRepTools import breptools_Read
# from project.OCC.TopoDS import TopoDS_Shape
# from project.OCC.BRep import BRep_Builder
# from project.OCC.Visualization import Tesselator

viewer_blueprint = Blueprint(
    'viewer', __name__,
    template_folder='templates',
    static_folder='static'
)

import os
import requests
# from project import OCC
from flask import Flask, render_template, request
def get_tess(brep_filename,js_filename):
  from OCC.BRepTools import breptools_Read
  from OCC.TopoDS import TopoDS_Shape
  from OCC.BRep import BRep_Builder
  from OCC.Visualization import Tesselator
  shape = TopoDS_Shape()
  builder = BRep_Builder()
  breptools_Read(shape, brep_filename, builder)
  tess = Tesselator(shape)
  tess.ExportShapeToJSON(js_filename)

# Controllers API
@viewer_blueprint.route("/viewer")
def viewer():
  import requests
  entity_id="56634e77180a4ae67618684b"
  r = requests.get('http://restfulifc.herokuapp.com/geometry?where={"entity_id": "'+entity_id+'"}')
  response=r.json()
  item=response['_items'][0]
  brep=item['occ_brep'].encode('ascii')
  path_brep = os.path.join(app.config['APP_TEMP_FILE'], entity_id+".brep")
  path_js = os.path.join(app.config['APP_TEMP_FILE'], entity_id+".js")
  with open(path_brep, 'wb') as f:
      f.write(brep)
  f.close()
  get_tess(path_brep,path_js)
  return render_template('viewer.html',path_js=path_js)
  