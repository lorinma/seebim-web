import {Component, ElementRef, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import {MD_CARD_DIRECTIVES} from "@angular2-material/card/card";
import {MdButton} from "@angular2-material/button/button";
import {MdInput} from "@angular2-material/input/input";
import {FileService} from "../../file.service";

declare var jQuery:any;
declare var Dropbox:any;

@Component({
  moduleId: module.id,
  selector: 'new-file',
  templateUrl: 'new-file.component.html',
  styleUrls: ['new-file.component.css'],
  directives: [
    MD_CARD_DIRECTIVES,
    MdButton,
    MdInput,
  ],
})

export class NewFileComponent  implements AfterViewInit {
  @Input() project_id: string;
  @Output() formFold=new EventEmitter();
  private options:Object;
  private dropbox_file:string;
  private errorMessage:string;

  constructor(private el:ElementRef,private _service:FileService) {
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
  }

  ngAfterViewInit(){
    let but=Dropbox.createChooseButton(this.options);
    jQuery(this.el.nativeElement).find('#dropbox-container').append(but);
    jQuery(this.el.nativeElement).find('#dropbox-container').append('<a id="_url"></a>');
  }

  addFile(name:string, desc:string){
    let file_url:string;
    file_url=jQuery(this.el.nativeElement).find('#_url').attr("href");
    if(file_url && name){
      this._service.addFile(name,desc,this.project_id,file_url)
        .subscribe(
          file => {
            this.formFold.emit(file);
          },
          error => this.errorMessage = <any>error
        );
    }
    else{
      alert("please fill the file name and choose an ifc file in dropbox");
    }
  }
}
