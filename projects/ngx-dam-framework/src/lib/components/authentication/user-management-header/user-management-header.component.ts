import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IAuthenticationState } from '../../../models/authentication/state';
import { LogoutRequest } from '../../../store/authentication/authentication.actions';
import * as fromAuth from '../../../store/authentication/index';

@Component({
  selector: 'dam-user-management-header',
  templateUrl: './user-management-header.component.html',
  styleUrls: ['./user-management-header.component.scss'],
})
export class UserManagementHeaderComponent implements OnInit {

  loggedIn: Observable<boolean>;
  username: Observable<string>;

  constructor(private store: Store<IAuthenticationState>, private router: Router) {
    this.loggedIn = store.select(fromAuth.selectIsLoggedIn);
    this.username = store.select(fromAuth.selectUsername);
  }

  logout() {
    this.store.dispatch(new LogoutRequest());
  }

  ngOnInit() {
  }

}
