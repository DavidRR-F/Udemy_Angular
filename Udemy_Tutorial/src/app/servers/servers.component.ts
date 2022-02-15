import { Component, OnInit } from '@angular/core';
/**
 * template can be used in place of templateUrl
 * lets you right your template html code in you ts file
 * as apposed to referencing an html file
 * Ex: of template below as apposed to templateUrl:'./servers.component.html'
 */
@Component({
  //select by atribute Ex: selector: '[app-servers]' in html <div app-servers></div>
  //select by class Ex: selector: '.app-servers' in html <div class="app-servers"></div>
  selector: 'app-servers',
  template: `
  <app-server></app-server>
  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
