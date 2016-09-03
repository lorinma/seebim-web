import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {RouteSegment} from "@angular/router";
import {MdButton, MD_BUTTON_DIRECTIVES} from "@angular2-material/button/button";
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MdIcon, MD_ICON_DIRECTIVES} from "@angular2-material/icon/icon";
import {MdInput, MD_INPUT_DIRECTIVES} from "@angular2-material/input/input";
import {MdIconRegistry} from "@angular2-material/icon/icon-registry";
import {Attribute} from "./panel/attribute";
import {MD_LIST_DIRECTIVES} from "@angular2-material/list/list";
import {MD_SIDENAV_DIRECTIVES} from "@angular2-material/sidenav/sidenav";
import {MdTabContent} from "@angular2-material/tabs/tab-content";
import {MdTabGroup, MD_TABS_DIRECTIVES} from "@angular2-material/tabs/tabs";
import {MdTabLabel} from "@angular2-material/tabs/tab-label";
import {EntityService} from "../../entity.service";
import {TrimbleFile} from "./trimble-file";
import {ViewerComponent} from "./panel/viewer/viewer.component";
import {UserPropertySet} from "./panel/user-property-set";
import {UserProperty} from "./panel/user-property";
import {QueryComponent} from "./panel/query/query.component";
import {Entity} from "./panel/entity";
import {Clause} from "./panel/query/clause";
import {MD_RADIO_DIRECTIVES, MdRadioGroup} from "@angular2-material/radio/radio";
import {MdRadioDispatcher, MdRadioDispatcherListener} from "@angular2-material/radio/radio_dispatcher";
import {Pairwise} from "./panel/pairwise";

declare var EmbeddedViewer:any;
declare var jQuery:any;

@Component({
  moduleId: module.id,
  selector: 'app-model-viewer',
  templateUrl: 'model-viewer.component.html',
  styleUrls: ['model-viewer.component.css'],
  directives:[
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    MdButton,
    MdIcon,
    MdInput,
    MD_SIDENAV_DIRECTIVES,
    MdTabContent,
    MdTabGroup,
    MdTabLabel,

    MD_INPUT_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_TABS_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_ICON_DIRECTIVES,
    ViewerComponent,

    MD_RADIO_DIRECTIVES,
    MdRadioGroup,
    QueryComponent,
  ],
  providers:[
    MdIconRegistry,
    EntityService,
    MdRadioDispatcher
  ]
})
export class ModelViewerComponent   implements OnInit  {
  @ViewChild('info') side_property;
  private entity:Entity;
  private errorMessage:string;
  private formshow:boolean[];
  private extent:Object;
  private transformation:Object;
  private centroid:Object;
  private geometry:Object;
  private file_id:string;
  private file:TrimbleFile;
  private options:Object;
  private ViewerNode:any;
  private viewer:any;
  private viewer_data:any;

  private collections:Entity[];
  private clauses:Clause[];
  private fieldOptions=[
    {
      'value': 'volume',
      'label': 'Volume',
      'disable':false
    },
    {
      'value':'extent',
      'label':'more are comming soon',
      'disable':true
    }
    ];

  private operatorOptions=[
    {
      'value': '$lt',
      'label': 'Smaller than',
      'disable':false
    },
    {
      'value':'$eq',
      'label':'Equal',
      'disable':false
    },
    {
      'value':'$gt',
      'label':'Greater than',
      'disable':false
    }
  ];

  private sheet_info=false;
  constructor(private el:ElementRef,private curr: RouteSegment,private _service:EntityService) {
    this.file_id=curr.getParam("id");
    this.options = {
      hideLeftPanel: false,
      leftPanel: {
        hideView: false,
        view: {
          hideCreateView: false,
          hideUpdateView: false,
          hideDeleteView: false
        },
        hideModelTree: false,
        hideClash: false,
        clash: {
          hideCreateClash: false,
          hideDeleteClash: false
        },
        hideReport: false,
        report: {
          hideCustomReport: false
        }
      },
      hideToolbar: false,
      toolbar: {
        hideDownload: false,
        hideNavigation: false,
        hidePresetView: false,
        hideZoomSelect: false,
        hideTool: false,
        hideMarkup: false,
        hideReset: false
      },
      hideProperty: true
    }
  }

  ngOnInit() {
    this.getFile();
  }

  private getFile() {
    console.log("arrive")
    this._service.getEntity(this.file_id,'fileTrimble').subscribe(
      res=>{
        this.file=res;
        this.ViewerNode=jQuery(this.el.nativeElement).find('#TrimbleConnectViewer');
        this.viewer_data = {
          "projId": this.file.trimble_project_id,
          "objects": this.file.trimble_file_id,
          "domNode": this.ViewerNode,
          "accessToken": this.file.trimble_token,
          "class": "embeddedViewFrame",
          // do not set width and height, then they re 100%
          // "width": "80%",
          // "height": "1000",
          "debug": true,
          "onInitialized": function() {
            // do something with https://app.prod.gteam.com/tc/static/apidoc.html
          },
          "onSelectionChanged": function(data) {
            // get internal id
            var internal_ids = data.ids
            if (internal_ids.length < 1) {
              return 0
            }
            // convert to external id (guid in ifc file)
            this.getSourceID(internal_ids, function(guid) {
              // console.log(guid)
              var div = document.getElementById("guids")
              div.innerText=guid;
              var but = document.getElementById("selected_guids")
              var evt = document.createEvent("MouseEvents");
              evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              but.dispatchEvent(evt);
            });
          },
          "options": this.options,
          "gteamOrigin": encodeURIComponent("https://app.prod.gteam.com"),
          "title": "SeeBIM Viewer",
        };
        this.viewer = new EmbeddedViewer(this.viewer_data);
      },
      error => this.errorMessage = <any>error
    )
  }

  select_item(data){
    var self=this;
    this.viewer.getGTeamID(
        // ["3lB8HeqWX8Tfa2Zdze9mAo", "3lB8HeqWX8Tfa2Zdze9mMC"],
      // ["3lB8HeqWX8Tfa2Zdze9mAo"],
      data,
      [this.file.trimble_version_id],
      function(id){
        self.viewer.setSelection(id,false);
      }
    );
  }

  isGUID(str:string){
    return str=="GlobalId";
  }
  parse_feature(data:any){
    if(typeof data==='number'){
      return data.toFixed(3);
    }
    // if(Array.isArray(data)){
    //   for(var i in data){
    //     data[i]=this.parse_feature(data[i])
    //   //   if(Array.isArray(data[i])){
    //   //     for(var j in data[i]){
    //   //       data[i][j].toFixed(1)
    //   //     }
    //   //   }
    //   //   else{
    //   //     data[i].toFixed(1)
    //   //   }
    //   }
    //   return data;
    // }
    return JSON.stringify(data)
  }
  feature_type(data:any){

    if(Array.isArray(data)) {
      return 'input';
    }
    if(typeof data==='string' || typeof data==='number' || typeof data==='boolean') {
      return 'input';
    }
    return 'input';
    // return typeof data;
  }
  getValueByKey(data:Object,key:string,target:string='Name',return_key:string='Value'){
    for(var i in data){
      if(data[i][target]==key){
        return data[i][return_key]
      }
    }
    return null
  }
  getEntity(){
    let div = jQuery(this.el.nativeElement).find('#guids');
    let ids = div.text().split(",");
    let guid:string;
    if (Array.isArray(ids) && ids.length!=1) {
      console.log("more are selected");
      this.entity=null;
      this.side_property.close();
      return 0;
    }
    else {
      guid= ids[0]
    }
    this._service.getIDbyGUID(guid,this.file_id).subscribe(
      _id=>{
        this._service.getEntity(_id,"entityGeomFeature").subscribe(
          res=>{
            this.entity=res;
            console.log(res);
            this.formshow=new Array();
            for(var i in this.entity.PropertySets){
              this.formshow.push(false);
            }
            this.extent=this.getValueByKey(res['Features'],'Extent');
            this.centroid=this.getValueByKey(res['Features'],'Centroid');
            this.transformation=this.getValueByKey(res['Features'],'TransformMatrix');
            this.geometry=res['Geometry'];
            this.side_property.open();
          },
          error=>this.errorMessage=<any>error)
      },
      error=>this.errorMessage=<any>error)
  }
  updateAttribute(entity:Object){
    let data={
      Attribute:entity['Attribute']
    }
    let _id=entity['_id'];
    let _etag=entity['_etag'];
    this._service.updateEntity(_id, _etag, data).subscribe(
      res=> {
        this.entity['_etag']=res;
      },
      error=>this.errorMessage=<any>error
    );
  }
  addUserPropertySet(){
    let user_property_set:UserPropertySet={
      Name:"",
      Description:"",
      Children:[]
    }
    this.addUserProperty(user_property_set);
    if(!this.entity.UserProperty){
      this.entity.UserProperty=new Array();
    }
    this.entity.UserProperty.push(user_property_set);
  }
  addUserProperty(user_property_set:UserPropertySet){
    let property:UserProperty={
      Name:"",
      Description:"",
      Value:""
    }
    if(!user_property_set.Children){
      user_property_set.Children=new Array();
    }
    user_property_set.Children.push(property);
  }
  hasDupplicates(data:string[]){
    for (var i = 0; i < data.length; i++) {
      for (var j = i + 1; j < data.length; j++) {
        if (data[i] == data[j]) {
          return true;
        }
      }
    }
    return false;
  }
  updateUserPropertySet(){
    let p_sets=this.entity.UserProperty;
    let p_set_names:string[];
    p_set_names=new Array;
    for(var i in p_sets){
      if(p_sets[i].Name==""){
        alert("P_sets name should not be empty!");
        return null
      }
      p_set_names.push(p_sets[i].Name);
      let p_names:string[];
      p_names=new Array;
      for (var j in p_sets[i].Children) {
        if (p_sets[i].Children[j].Name == "") {
          alert("Property name should not be empty!");
          return null
        }
        p_names.push(p_sets[i].Children[j].Name)
      }
      if(p_names.length>1 && this.hasDupplicates(p_names)){
        alert("Property names should be different!");
        return null;
      }
    }
    if(p_set_names.length>1 && this.hasDupplicates(p_set_names)){
      alert("P_set names should be different!");
      return null;
    }
    let data={
      UserProperty:this.entity.UserProperty
    }
    this._service.updateEntity(this.entity._id,this.entity._etag,data).subscribe(
      etag=>{
        this.entity._etag=etag;
      },
      error=>this.errorMessage=<any>error
    );
  }
  removeUserPropertySet(user_property_set:UserPropertySet){
    let inx=this.entity.UserProperty.indexOf(user_property_set)
    this.entity.UserProperty.splice(inx,1);
  }
  removeUserProperty(user_property_set:UserPropertySet,user_property:UserProperty){
    let inx=user_property_set.Children.indexOf(user_property)
    user_property_set.Children.splice(inx,1);
    if(user_property_set.Children.length<1){
      this.removeUserPropertySet(user_property_set)
    }
  }

  private compare_result:Pairwise;
  connect(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Connect','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notConnect(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Connect','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  paraExtrusion(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Parallel','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notParaExtrusion(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Parallel','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  higherCentroid(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'HigherCentroid','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  lowerCentroid(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'HigherCentroid','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  higherBottom(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'LowerBottom','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  lowerBottom(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'LowerBottom','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  longgerExtrusion(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Longger','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  shorterExtrusion(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Longger','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  convex(){
    let value=this.getValueByKey(this.entity.Features,'IsConvex','Name','Value')
    if(value>0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notConvex(){
    let value=this.getValueByKey(this.entity.Features,'IsConvex','Name','Value')
    if(value<0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notParallelBridge(){
    let value=this.getValueByKey(this.entity.Features,'Longitudinal','Name','Value')
    if(value<0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  parallelBridge(){
    let value=this.getValueByKey(this.entity.Features,'Longitudinal','Name','Value')
    if(value>0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  volumeBigger(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Bigger','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  volumeSmaller(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Bigger','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notCompleteAbove(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Above','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  completeAbove(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'Above','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  closerTran(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'CloserTransverse','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  closerLongi(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'CloserLongitudinal','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  furtherTran(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'CloserTransverse','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  furtherLongi(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'CloserLongitudinal','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notParaBriTrans(){
    let value=this.getValueByKey(this.entity.Features,'Transverse','Name','Value')
    if(value<0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  paraBriTrans(){
    let value=this.getValueByKey(this.entity.Features,'Transverse','Name','Value')
    if(value>0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  Vertical(){
    let value=this.getValueByKey(this.entity.Features,'Vertical','Name','Value')
    if(value>0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notVertical(){
    let value=this.getValueByKey(this.entity.Features,'Vertical','Name','Value')
    if(value<0){
      return
    }
    let guid=this.getValueByKey(this.entity.Attribute,'GlobalId','Name','Value')
    let guids=new Array()
    guids.push(guid)
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  notOverlapZ(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'OverlapZ','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']>0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }
  overlapZ(){
    let pairs=this.getValueByKey(this.entity.PairwiseFeature,'OverlapZ','Type','Vector')
    let guids=new Array()
    for(var i in pairs){
      if(pairs[i]['Compare']<0) {
        guids.push(pairs[i]['GlobalId'])
      }
    }
    let self=this
    let trimble_file_id=this.file.trimble_version_id;
    this.viewer.getGTeamID(
      guids,
      trimble_file_id,
      function(ids){
        self.viewer.hide(ids);
      }
    );
  }

  highlight(){
    let GlobelId=this.getValueByKey(this.entity.Attribute,'GlobalId');
    let trimble_file_id=this.file.trimble_version_id;
    let self=this;
    this.viewer.getGTeamID(
      [GlobelId],
      trimble_file_id,
      function(ids){
        self.viewer.highlight(ids,false);
      }
    );
  }
  viewerReset(){
    // this.viewer.reset();
    // let GlobelId=this.getValueByKey(this.entity.Attribute,'GlobalId');
    // let trimble_file_id=this.file.trimble_version_id;
    // let self=this;
    // this.viewer.getGTeamID(
    //   [GlobelId],
    //   trimble_file_id,
    //   function(ids){
    //     self.viewer.highlight(ids,false);
    //   }
    // );
    this.viewer.showAll();
  }

  clear(){
    let id=this.file_id
    this._service.getEntity(this.file_id,'clear').subscribe(
      res=>{
        console.log(res)
      },
      error=>this.errorMessage=<any>error
    )
  }
  run(){
    let id=this.file_id
    this._service.getEntity(id,'run').subscribe(
      res=>{
        console.log(res)
      },
      error=>this.errorMessage=<any>error
    )
    // window.open('http://bit.ly/seebim-match')
  }

  addClause(){
    if(!this.clauses){
      this.clauses=new Array()
    }
    this.clauses.push({
      Datasource:'featureSearch',
      FileID:this.file_id,
      Field:'volume',
      Operator:'$gt',
      Value:0,
    })
  }
  removeClause(clause:Clause){
    let inx=this.clauses.indexOf(clause)
    this.clauses.splice(inx,1)
  }
  searchClause(){
    console.log(this.clauses);
    // if(this.clauses){
    //   for(var i in this.clauses){
    //     let clause=this.clauses[i];
    //     let url = '/featureSearch?where={"$and": [{"FileID":"'+this.file_id+'"},{"Feature.Name":"Volume"},{"Feature.Value":{"'+clause.Operator+'":'+clause.Value+'}}]}'
    //
    //   }
    // }

  }

}
