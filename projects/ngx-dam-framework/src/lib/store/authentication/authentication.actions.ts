import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { IAuthenticationState } from '../../models/authentication/state';
import { IDamUser } from '../../models/authentication/user.class';

export enum AuthenticationActionTypes {
  BootstrapCheckAuthStatus = '[DAMF Bootstrap Authentication] Check Authentication Status',

  LoginPageRequest = '[DAMF Login Page Authentication] Login Request',
  LoginSuccess = '[DAMF Authentication] Login Success',
  LoginFailure = '[DAMF Authentication] Login Failure',

  UnauthorizedRequest = '[DAMF Interceptor Authentication] Unauthorized Request',

  LogoutRequest = '[DAMF Logout Button Authentication] Logout Request',
  LogoutSuccess = '[DAMF Authentication] Logout Success',

  UpdateAuthStatus = '[DAMF Authentication] Update Authentication Status',
}

// [Bootstrap Authentication] Check Authentication Status, dispatched when bootstrapping the app to check the user's authentication status
export class BootstrapCheckAuthStatus implements Action {
  readonly type = AuthenticationActionTypes.BootstrapCheckAuthStatus;
}

export class LoginRequest {
  username: string;
  password: string;
}

// [Login Page Authentication] Login Request, dispatched when a User tries to login from the login page
export class LoginPageRequest implements Action {
  readonly type = AuthenticationActionTypes.LoginPageRequest;

  constructor(readonly payload: LoginRequest) {
  }
}

// [Authentication] Login Success, dispatched when Login was successful
export class LoginSuccess implements Action {
  readonly type = AuthenticationActionTypes.LoginSuccess;

  constructor(readonly payload: IDamUser) {
  }
}

// [Authentication] Login Failure, dispatched when login attempt has failed
export class LoginFailure implements Action {
  readonly type = AuthenticationActionTypes.LoginFailure;

  constructor(readonly error: HttpErrorResponse) {
  }
}

// [Interceptor Authentication] Unauthorized Request, dispatched when a request was unauthorized which means cookie token has expired'
export class UnauthorizedRequest implements Action {
  readonly type = AuthenticationActionTypes.UnauthorizedRequest;

  constructor(readonly error: HttpErrorResponse) {
  }
}

// [Logout Button Authentication] Logout Request, dispatched when the user click the Logout button
export class LogoutRequest implements Action {
  readonly type = AuthenticationActionTypes.LogoutRequest;
}

// [Authentication] dispatched when logout was successful
export class LogoutSuccess implements Action {
  readonly type = AuthenticationActionTypes.LogoutSuccess;
}

// [Authentication] Update Authentication Status, dispatched to update the User's authentication state
export class UpdateAuthStatus implements Action {
  readonly type = AuthenticationActionTypes.UpdateAuthStatus;

  constructor(readonly payload: IAuthenticationState) {
  }
}

export type AuthenticationActions = BootstrapCheckAuthStatus | LoginPageRequest
  | LoginSuccess | LoginFailure | UnauthorizedRequest
  | LogoutRequest | LogoutSuccess | UpdateAuthStatus;
