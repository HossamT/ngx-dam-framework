import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn } from '../../../../ngx-dam-framework/src/lib/store/authentication/authentication.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private store: Store<any>) {
    this.isLoggedIn$ = store.select(selectIsLoggedIn);
  }

  ngOnInit(): void {
  }

}
