import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DAM_AUTH_CONFIG } from '../injection-token';
import { IDamUser } from '../models/authentication/user.class';
import { Message } from '../models/messages/message.class';

export interface IAuthenticationConfig {
  api: {
    login: string,
    checkAuthStatus: string,
    logout: string,
    checkLinkToken: string,
  };
  forgotPasswordUrl: string;
  loginPageRedirectUrl: string;
  unprotectedRedirectUrl: string;
  loginSuccessRedirectUrl: string;
  sessionTimeoutStatusCodes: number[];
}

export type UserTransformer<E, T extends IDamUser> = (user: E) => T;

@Injectable()
export class AuthenticationService {

  constructor(
    @Inject(DAM_AUTH_CONFIG) private authConfig: IAuthenticationConfig,
    private http: HttpClient) {
  }

  getLoginPageRedirectUrl(): string {
    return this.authConfig.loginPageRedirectUrl;
  }

  getUnprotectedRedirectUrl(): string {
    return this.authConfig.unprotectedRedirectUrl;
  }

  getLoginSuccessRedirectUrl(): string {
    return this.authConfig.loginSuccessRedirectUrl;
  }

  getForgotPasswordUrl(): string {
    return this.authConfig.forgotPasswordUrl;
  }

  login(username: string, password: string): Observable<Message<any>> {
    return this.http.post<Message<any>>(this.authConfig.api.login, {
      username,
      password,
    });
  }

  checkLinkToken(token: string, context: any): Observable<Message<any>> {
    return this.http.post<Message<any>>(this.authConfig.api.checkLinkToken, {
      token,
      context,
    });
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get<any>(this.authConfig.api.checkAuthStatus);
  }

  logout(): Observable<Message<any>> {
    return this.http.get<Message<any>>(this.authConfig.api.logout);
  }
}
