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

from flask import Blueprint, request, jsonify
from project import app
import requests
import os
from bson.objectid import ObjectId
import project.ifcopenshell as ifc
import project.ifcopenshell.geom as geom

from pymongo import MongoClient
client = MongoClient(host=app.config['MONGODB_HOST'], port=int(app.config['MONGODB_PORT']))
db = client.ifc
db.authenticate(app.config['MONGODB_USER'], app.config['MONGODB_KEY'])

upload_blueprint = Blueprint(
    'upload', __name__,
    template_folder='templates'
)

#TODO Heroku doesn't allow store file on server?
def save_file(url,path):
    r = requests.get(url)
    with open(path, 'wb') as f:
        f.write(r.content)

# parse ifc file get all the data
def parse_ifc(path,additional_data):
    file = ifc.open(path)
    line_ids=file.wrapped_data.entity_names()
    data=list()
    for line_id in line_ids:
        entity = file.wrapped_data.by_id(line_id)
        entity_data = {"line_id":entity.id(),"_id":ObjectId(),"type": entity.is_a(),"content": entity.__str__()}
        entity_data.update(additional_data)
        data.append(entity_data)
    data_indexed=build_dict(data,key="line_id")
    inx=0
    for line_id in line_ids:
        entity = file.wrapped_data.by_id(line_id)  
        for attribute_name in entity.get_attribute_names():
            attribute_value=entity.get_argument(attribute_name)   
            try:
                a_line_id=attribute_value.id()
                if a_line_id==0:
                    # some value like IfcMassMeasure(0.), will give id=0, and need to extract the real value
                    data[inx][attribute_name]=attribute_value.get_argument(0)
                else:
                    data[inx][attribute_name]=data_indexed[a_line_id]["_id"]
            except:
                import types
                if isinstance(attribute_value, tuple):
                    data[inx][attribute_name]=list()
                    for v in attribute_value:
                        try:
                            a_line_id=v.id()
                            data[inx][attribute_name].append(data_indexed[a_line_id]["_id"])
                        except:
                            data[inx][attribute_name].append(v)
                else:
                    data[inx][attribute_name]=attribute_value
        for attribute_name in entity.get_inverse_attribute_names():
            attribute_value=entity.get_inverse(attribute_name)
            if not attribute_value:
                continue
            try:
                a_line_id=attribute_value.id()
                if a_line_id==0:
                    # some value like IfcMassMeasure(0.), will give id=0, and need to extract the real value
                    data[inx][attribute_name]=attribute_value.get_argument(0)
                else:
                    data[inx][attribute_name]=data_indexed[a_line_id]["_id"]
            except:
                import types
                if isinstance(attribute_value, tuple):
                    data[inx][attribute_name]=list()
                    for v in attribute_value:
                        try:
                            a_line_id=v.id()
                            data[inx][attribute_name].append(data_indexed[a_line_id]["_id"])
                        except:
                            data[inx][attribute_name].append(v)
                else:
                    data[inx][attribute_name]=attribute_value
        include_list=file.wrapped_data.traverse(entity)
        if len(include_list)>1:
            data[inx]["include"]=list()
            # this will include all the entities that direct/indirect used for it
            for include in include_list:
                # some traverse result may include some value like IfcMassMeasure(0.) which is just a subclass of real and has no line_id
                try:
                    a_line_id=include.id()
                    if a_line_id!=line_id:
                        data[inx]["include"].append(data_indexed[a_line_id]["_id"])
                except:
                    pass
        inx+=1
    elements=file.by_type("IfcBuildingElement")
    geom_data=list()
    settings = geom.settings()
    settings.set(settings.USE_BREP_DATA, True)
    for element in elements:   
        g_data=dict()
        try:
            obj = geom.create_shape(settings, element)
            shape = obj.geometry
            g_data['entity_id']=data_indexed[element.id()]['_id']
            g_data['occ_brep']=shape.brep_data
            g_data.update(additional_data)
            geom_data.append(g_data)
        except:
            pass
    return (data,geom_data)

# use decorators to link the function to a url
@upload_blueprint.route('/upload')
# @login_required  # pragma: no cover
def upload():
    project_id=ObjectId(request.args.get('project_id'))
    filename = request.args.get('filename')
    file_id=db.file.insert_one({"project_id":project_id,"filename":filename}).inserted_id
    
    # save file to web server
    url = request.args.get('url')
    url = url[:-1]+'1'
    path = os.path.join(app.config['APP_TEMP_FILE'], str(ObjectId())+".ifc")
    save_file(url,path)
    
    # post entities to mongodb
    data,geom_data=parse_ifc(path,{'project_id':project_id,'file_id':file_id})
    db.entity.insert_many(data)
    db.geometry.insert_many(geom_data)
    #
    # # #### test ####
    # #     response_data=r.json()
    # #     return json.dumps(response_data)
    # # #### test ####
    #
    os.remove(path)
    return jsonify(filename=filename,file_id=str(file_id))

# if you are going to fetch repeatedly from name, you better construct a dictionary with the names as keys so get operations are O(1)
def build_dict(seq, key):
    return dict((d[key], dict(d, index=i)) for (i, d) in enumerate(seq))