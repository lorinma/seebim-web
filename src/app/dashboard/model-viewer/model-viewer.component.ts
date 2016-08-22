import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {FileService} from "../file.service";
import {File} from "../file";

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

  private sub: Subscription;

  private model_id:string
  private options:Object;
  private ViewerNode:any;
  private viewer:any;
  private viewer_data:any;
  private file:File
  private errorMessage:string;

  constructor(private route: ActivatedRoute,private el:ElementRef,private _service:FileService) {
    // this.options = {
    //   hideLeftPanel: false,
    //   leftPanel: {
    //     hideView: false,
    //     view: {
    //       hideCreateView: false,
    //       hideUpdateView: false,
    //       hideDeleteView: false
    //     },
    //     hideModelTree: false,
    //     hideClash: false,
    //     clash: {
    //       hideCreateClash: false,
    //       hideDeleteClash: false
    //     },
    //     hideReport: false,
    //     report: {
    //       hideCustomReport: false
    //     }
    //   },
    //   hideToolbar: false,
    //   toolbar: {
    //     hideDownload: false,
    //     hideNavigation: false,
    //     hidePresetView: false,
    //     hideZoomSelect: false,
    //     hideTool: false,
    //     hideMarkup: false,
    //     hideReset: false
    //   },
    //   hideProperty: false
    // }
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
        this.file=res[0];
        console.log(this.file)
        // this.ViewerNode=jQuery(this.el.nativeElement).find('#TrimbleConnectViewer');
        // this.viewer_data = {
        //   "domNode": this.ViewerNode,
        //   "projId": this.file.TrimbleProjectID,
        //   "objects": this.file.TrimbleVersionID,
        //   "accessToken": this.file.token,
        //   "class": "embeddedViewFrame",
        //   // do not set width and height, then they re 100%
        //   // "width": "80%",
        //   // "height": "1000",
        //   "debug": true,
        //   "onInitialized": function() {
        //     // do something with https://app.prod.gteam.com/tc/static/apidoc.html
        //   },
        //   "onSelectionChanged": function(data) {
        //     // get internal id
        //     var internal_ids = data.ids
        //     if (internal_ids.length < 1) {
        //       return 0
        //     }
        //     // convert to external id (guid in ifc file)
        //     this.getSourceID(internal_ids, function(guid) {
        //       // console.log(guid)
        //       var div = document.getElementById("guids")
        //       div.innerText=guid;
        //       var but = document.getElementById("selected_guids")
        //       var evt = document.createEvent("MouseEvents");
        //       evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //       but.dispatchEvent(evt);
        //     });
        //   },
        //   "options": this.options,
        //   "gteamOrigin": encodeURIComponent("https://app.prod.gteam.com"),
        //   "title": "SeeBIM Viewer",
        // };
        // this.viewer = new EmbeddedViewer(this.viewer_data);
      },
      error => this.errorMessage = <any>error
    )
  }
}
