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
  //template: `
  //<app-server></app-server>
  //<app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  allowNewServer = false;
  serverCreationStatus = 'No Server Was Created';
  serverName = '';
  serverCreated = false;
  servers = ['Testserver', 'Testserver 2'];

  constructor() { 
    // on construction after 2 seconds set allowNewServer to true
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server ' + this.serverName + ' Was Created';
    this.serverCreated = true;
    this.servers.push(this.serverName);
  }

  //sets server name to user input
  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

}
