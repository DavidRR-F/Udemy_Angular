import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  
  users: string[];

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
  }

  ngOnInit(): void {
      this.users = this.usersService.inactiveUsers;
  }

  constructor(private usersService: UsersService) {}

}
