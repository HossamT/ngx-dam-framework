import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectIsLoggedIn,
  selectUsername,
  LogoutRequest,
} from 'ngx-dam-framework';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  username$: Observable<string>;

  constructor(private store: Store<any>) {
    // User Is Logged In
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

    // Username
    this.username$ = this.store.select(selectUsername);
  }

  logout() {
    this.store.dispatch(new LogoutRequest());
  }

  ngOnInit() {
  }
}
