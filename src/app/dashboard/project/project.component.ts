import {Component, AfterViewInit, ElementRef} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {FileService} from "../file.service";
import {File} from "../file";

declare var jQuery:any;
declare var Dropbox:any;

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [
    FileService
  ]
})
export class ProjectComponent implements AfterViewInit {
  private sub: Subscription;
  private options:Object;
  private dropbox_file:string;
  private errorMessage:string;
  private files:File[];
  private project_id;

  constructor(private route: ActivatedRoute,private el:ElementRef, private _service:FileService) {
    this.options = {
      // Required. Called when a user selects an item in the Chooser.
      success: function(files) {
        // alert("Here's the file link: " + files[0].link);
        this.dropbox_file=files[0].link;
        var link=document.getElementById("_url");
        link.innerText="file link";
        link.setAttribute("href",this.dropbox_file);
        link.style.visibility="hidden";
      },
      // Optional. Called when the user closes the dialog without selecting a file
      // and does not include any parameters.
      cancel: function() {
      },
      // Optional. "preview" (default) is a preview link to the document for sharing,
      // "direct" is an expiring link to download the contents of the file. For more
      // information about link types, see Link types below.
      linkType: "direct", // or "preview"
      // Optional. A value of false (default) limits selection to a single file, while
      // true enables multiple file selection.
      multiselect: false, // or true
      // Optional. This is a list of file extensions. If specified, the user will
      // only be able to select files with these extensions. You may also specify
      // file types, such as "video" or "images" in the list. For more information,
      // see File types below. By default, all extensions are allowed.
      extensions: ['.ifc']
    };
    this.sub = this.route.params.subscribe(params => {
      this.project_id=params['id'];
      this.getFiles()
    });
  }
  ngAfterViewInit(){
    let but=Dropbox.createChooseButton(this.options);
    jQuery(this.el.nativeElement).find('#dropbox-container').append(but);
    jQuery(this.el.nativeElement).find('#dropbox-container').append('<a id="_url"></a>');

  }
  addFile(){
    let file_url:string;
    file_url=jQuery(this.el.nativeElement).find('#_url').attr("href");
    let new_file:File;
    if(file_url){
      this._service.addFile(this.project_id,file_url)
        .subscribe(
          file => {
            new_file=file;
            this.files.push(new_file);
          },
          error => this.errorMessage = <any>error
        );
    }
  }
  getFiles() {
    this._service.getFiles(this.project_id).subscribe(
      res=>{
        this.files=res;
      },
      error => this.errorMessage = <any>error
    )
  }
  deleteFile(file:File) {
    let _id=file._id;
    let inx = this.files.indexOf(file);
    this.files.splice(inx,1);
    this._service.deleteFile(_id).subscribe(
      res=>{
      },
      error => this.errorMessage = <any>error
    )
  }
}
