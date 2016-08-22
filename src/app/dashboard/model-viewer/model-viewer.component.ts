import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-model-viewer',
  templateUrl: 'model-viewer.component.html',
  styleUrls: ['model-viewer.component.css']
})
export class ModelViewerComponent implements OnInit {

  private sub: Subscription;

  private model_id:string
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.model_id=params['id']; // (+) converts string 'id' to a number
    });
  }

}
