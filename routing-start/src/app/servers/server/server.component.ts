import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ServerModel } from '../servers.model';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: ServerModel;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit() {
    // + infront of value makes string a number 
    // this.server = this.serversService.getServer(+this.route.snapshot.params['id']);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
    this.route.data.subscribe(
      (data: Data) => {
        this.server = data['server'];
      }
    );
  }

  onEdit(){
    // queryparamhandling allows actions on current params
    // preserve: keep current params
    // merge: add new params
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
