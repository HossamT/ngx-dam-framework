import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, concatMap, flatMap, map, mergeMap } from 'rxjs/operators';
import { Message, MessageType, UserMessage } from '../../models/messages/message.class';
import { AuthenticationService, UserTransformer } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { RxjsStoreHelperService } from '../../services/rxjs-store-helper.service';
import * as fromDAM from '../../store/index';
import { IDamUser } from '../../models/authentication/user.class';
import { DAM_AUTH_USER_TRANSFORMER } from '../../injection-token';
import {
  AuthenticationActions,
  AuthenticationActionTypes,
  BootstrapCheckAuthStatus,
  LoginFailure,
  LoginPageRequest,
  LoginSuccess,
  LogoutSuccess,
  UpdateAuthStatus,
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

  // Triggered when a login attempt is made
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginPageRequest),
    concatMap((action: LoginPageRequest) => {
      this.store.dispatch(new fromDAM.TurnOnLoader({
        blockUI: false,
      }));
      return this.authService.login(action.payload.username, action.payload.password).pipe(
        map((message: Message<any>) => {
          return new LoginSuccess(this.userTransformer(message.data));
        }),
        catchError((error: HttpErrorResponse) => {
          return of(new LoginFailure(error));
        }),
      );
    }),
  );
  // Triggered when the application is bootstraped to check if user is already logged in (through Cookies)
  @Effect()
  checkAuthStatus$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.BootstrapCheckAuthStatus),
    mergeMap((action: BootstrapCheckAuthStatus) => {
      return this.authService.checkAuthStatus();
    }),
    map((user: any) => {
      return new UpdateAuthStatus({
        isLoggedIn: true,
        userInfo: this.userTransformer(user),
      });
    }),
    catchError((error: string) => {
      return of(new UpdateAuthStatus({
        isLoggedIn: false,
        userInfo: null,
      }));
    }),
  );
  // Triggered when the user requests a logout
  @Effect()
  logoutRequest$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LogoutRequest),
    mergeMap(() => {
      return this.authService.logout();
    }),
    map(() => {
      return new LogoutSuccess();
    }),
  );

  @Effect()
  unauthorizedRequest$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.UnauthorizedRequest),
    flatMap(() => {
      this.router.navigate([this.authService.getUnprotectedRedirectUrl()]);
      return [
        new fromDAM.TurnOffLoader(),
        this.message.userMessageToAction(new UserMessage(MessageType.WARNING, 'Session timed out')),
        new UpdateAuthStatus({
          userInfo: null,
          isLoggedIn: false,
        })];
    }),
  );

  // Triggered when the logout is successful
  @Effect()
  logoutSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LogoutSuccess),
    map(() => {
      this.router.navigate([this.authService.getUnprotectedRedirectUrl()]);
      return new UpdateAuthStatus({
        userInfo: null,
        isLoggedIn: false,
      });
    }),
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginSuccess),
    this.helper.finalize<LoginSuccess>({
      clearMessages: true,
      turnOffLoader: true,
      handler: (action: LoginSuccess) => {
        return [
          new UpdateAuthStatus({
            userInfo: action.payload,
            isLoggedIn: true,
          }),
        ];
      },
    }),
  );

  // ---------------- LOGIN SUCCESS/FAILURE ----------------
  @Effect()
  loginFailure$ = this.actions$.pipe(
    ofType(AuthenticationActionTypes.LoginFailure),
    this.helper.finalize<LoginFailure, HttpErrorResponse>({
      clearMessages: true,
      turnOffLoader: true,
      handler: (action: LoginFailure) => {
        return [
          new UpdateAuthStatus({
            userInfo: null,
            isLoggedIn: false,
          }),
        ];
      },
      message: (action: LoginFailure) => {
        return action.error;
      },
    }),
  );

  constructor(
    private actions$: Actions<AuthenticationActions>,
    private store: Store<any>,
    private router: Router,
    private message: MessageService,
    private authService: AuthenticationService,
    @Inject(DAM_AUTH_USER_TRANSFORMER) private userTransformer: UserTransformer<any, IDamUser>,
    private helper: RxjsStoreHelperService,
  ) {
  }

}
