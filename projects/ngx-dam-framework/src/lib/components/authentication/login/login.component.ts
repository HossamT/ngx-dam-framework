import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAuthenticationState } from '../../../models/authentication/state';
import { AuthenticationService } from '../../../services/authentication.service';
import * as fromAuth from '../../../store/authentication/index';
import { ClearAll } from '../../../store/messages/messages.actions';
import { TurnOffLoader } from '../../../store/loader/loader.actions';

@Component({
  selector: 'dam-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  goTo: string;
  forgotPasswordUrl: string;

  constructor(
    private store: Store<IAuthenticationState>,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.goTo = this.authService.getLoginSuccessRedirectUrl();
    this.forgotPasswordUrl = this.authService.getForgotPasswordUrl();
  }

  authenticate(request: fromAuth.LoginRequest) {
    this.store.dispatch(new fromAuth.LoginPageRequest(request));
  }

  ngOnInit() {
    this.store.dispatch(new ClearAll());
    this.store.dispatch(new TurnOffLoader(true));
    this.route.queryParams.subscribe(
      (params) => {
        if (params['return']) {
          this.goTo = params['return'];
        }
      },
    );

    this.store.select(fromAuth.selectIsLoggedIn).subscribe(
      (isLogged) => {
        if (isLogged) {
          this.router.navigateByUrl(this.goTo);
        }
      },
    );
  }
}
