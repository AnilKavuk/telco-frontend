import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-title',
  templateUrl: './overlay-title.component.html',
  styleUrls: ['./overlay-title.component.css']
})
export class OverlayTitleComponent implements OnInit {

  @Input() text!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
