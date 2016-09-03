import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FileService} from "../file.service";
import {File} from "../file";
import {Feature} from "../feature";

declare var EmbeddedViewer:any;
declare var jQuery:any;

@Component({
  selector: 'app-model-viewer',
  templateUrl: 'model-viewer.component.html',
  styleUrls: ['model-viewer.component.css'],
  providers: [
    FileService
  ]
})
export class ModelViewerComponent implements OnInit {
  @ViewChild('info') side_property;
  private sub: Subscription;
  private geometry_show=false;
  private pairwise_show=false;
  private model_id:string;
  private options:Object;
  private ViewerNode:any;
  private viewer:any;
  private viewer_data:any;
  private file:File;
  private all_obj_ids:string[];
  private hidden_obj_ids:string[];
  private errorMessage:string;
  private features:Feature[];
  private geometry_features:Feature[];
  private pairwise_features:Feature[];
  private user_features:Feature[];
  private guid:string;
  private formshow;
  constructor(private route: ActivatedRoute,private el:ElementRef,private _service:FileService,private router:Router) {
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
      hideProperty: false
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.model_id=params['id']; // (+) converts string 'id' to a number
      this.getFile()
    });
  }
  private getFile() {
    this._service.getViewerData(this.model_id).subscribe(
      res=>{
        this.file=res;
        this.ViewerNode=jQuery(this.el.nativeElement).find('#TrimbleConnectViewer');
        this.viewer_data = {
          "domNode": this.ViewerNode,
          "title": "SeeBIM Viewer",
          "noProperties": false,
          "noLeft": false,
          "debug": true,
          "options": this.options,
          // do not set width and height, then they re 100%
          // "width": "80%",
          // "height": "1000",
          "gteamOrigin": encodeURIComponent("https://app.prod.gteam.com"),
          "projId": this.file.TrimbleProjectID,
          "objects": this.file.TrimbleVersionID,
          "accessToken": this.file.token,
          "class": "embeddedViewFrame",
          "onInitialized": function() {
            // do something with https://app.prod.gteam.com/tc/static/apidoc.html
          },
          "onSelectionChanged": function(data) {
            // get internal id
            var internal_ids = data.ids;
            if (internal_ids.length < 1) {
              return 0
            }
            // convert to external id (guid in ifc file)
            this.getSourceID(internal_ids, function(guid) {
              var div = document.getElementById("guids");
              div.innerText=guid;
              var but = document.getElementById("selected_guids");
              var evt = document.createEvent("MouseEvents");
              evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              but.dispatchEvent(evt);
            });
          },
        };
        this.viewer = new EmbeddedViewer(this.viewer_data);
        var self=this;
        this.all_obj_ids=new Array();
        this.hidden_obj_ids=new Array();
        // this.viewer.getObjectCount(function(count){
        //   self.viewer.getObjectsRange(0,count,function(ids){
        //     self.all_obj_ids=ids;
        //   });
        // });
      },
      error => {
        this.router.navigate(['']);
        this.errorMessage = <any>error
      }
    )
  }
  getEntity(){
    let div = jQuery(this.el.nativeElement).find('#guids');
    let ids = div.text().split(",");
    let guid:string;
    if (Array.isArray(ids) && ids.length!=1) {
      console.log("more are selected");
      return 0;
    }
    else {
      guid= ids[0]
    }
    this._service.getFeatures(guid,this.file.TrimbleVersionID).subscribe(
      features=>{
        this.features=features;
        this.guid=features[0].GlobalId;
        this.geometry_features=new Array();
        this.pairwise_features=new Array();
        this.user_features=new Array();
        for(var i=0; i<features.length; i++){
          if(features[i].FeatureType=='Geometry' && features[i].FeatureProvider=='System'){
            this.geometry_features.push(features[i]);
            continue;
          }
          if(features[i].FeatureType=='Pairwise' && features[i].FeatureProvider=='System'){
            this.pairwise_features.push(features[i]);
            continue;
          }
          //else they are user defined features
          this.user_features.push(features[i]);
        }
        this.side_property.open();
      },
      error=>this.errorMessage=<any>error)
  }

  show_objects(objs:string[]){
    var self=this;
    this.viewer.getGTeamID(
      objs,
      [this.file.TrimbleVersionID],
      function(ids){
        console.log(ids);
        self.viewer.hide(ids);
        // self.viewer.setSelection(id,false);
        // self.viewer.highlight(ids,false);
        // self.viewer.show(id);
      }
    );
  }
}
