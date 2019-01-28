import { Component, OnInit, Input } from '@angular/core';

import { ServerError } from 'src/app/models/todo';

@Component({
  selector: 'app-error-panel',
  templateUrl: './error-panel.component.html',
  styleUrls: ['./error-panel.component.css']
})
export class ErrorPanelComponent implements OnInit {
  @Input() error: ServerError;

  constructor() { }

  ngOnInit() {
  }

}
