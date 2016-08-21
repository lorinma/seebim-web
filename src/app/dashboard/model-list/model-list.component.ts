import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {FileService} from "../file.service";
import {File} from "../file";

declare var jQuery:any;
declare var Dropbox:any;

@Component({
  selector: 'app-model-list',
  templateUrl: 'model-list.component.html',
  styleUrls: ['model-list.component.css'],
  providers:[
    FileService
  ]
})
export class ModelListComponent implements AfterViewInit {
  private options:Object;
  private dropbox_file:string;
  private errorMessage:string;
  private files:File[];

  //change!!!!!!!!!!!!!!
  private user_id='ling';

  constructor(private el:ElementRef, private _service:FileService) {
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
    this.getFiles()
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
      this._service.addFile(this.user_id,file_url)
        .subscribe(
          file => {
            new_file=file;
            // this.files.push(new_file);
            // console.log(this.files);
          },
          error => this.errorMessage = <any>error
        );
    }
  }

  getFiles() {
    this._service.getFiles(this.user_id).subscribe(
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
