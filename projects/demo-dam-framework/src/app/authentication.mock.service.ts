import { AuthenticationService } from 'ngx-dam-framework';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'ngx-dam-framework';
import { MessageType } from '../../../ngx-dam-framework/src/lib/models/messages/message.class';
import { of, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { flatMap } from 'rxjs/operators';
import { IDamUser } from '../../../ngx-dam-framework/src/lib/models/authentication/user.class';

@Injectable()
export class AuthenticationMockService extends AuthenticationService {

  readonly fni = 'Feature Not Implemented';

  constructor(http: HttpClient, private storage: StorageMap) {
    super(undefined, http);
  }

  getLoginPageRedirectUrl(): string {
    return '/login';
  }

  getUnprotectedRedirectUrl(): string {
    return '/home';
  }

  getLoginSuccessRedirectUrl(): string {
    return '/widget';
  }

  getForgotPasswordUrl(): string {
    return '/home';
  }

  login(username: string, password: string): Observable<Message<any>> {
    const user = { username };
    this.storage.set('user', user).subscribe();
    this.storage.set('loggedIn', true).subscribe();
    return of(new Message(MessageType.SUCCESS, 'Login Success', user));
  }

  requestChangePassword(email: string): Observable<Message<string>> {
    throw new Error(this.fni);
  }

  validateToken(token: string): Observable<Message<string>> {
    throw new Error(this.fni);
  }

  updatePassword(token: string, password: string): Observable<Message<any>> {
    throw new Error(this.fni);
  }

  checkAuthStatus(): Observable<any> {
    return this.storage.get('loggedIn').pipe(
      flatMap((value) => {
        if (value) {
          return this.storage.get<IDamUser>('user') as Observable<IDamUser>;
        } else {
          return throwError(new HttpErrorResponse({
            status: 403,
          }));
        }
      }),
    );
  }

  logout(): Observable<Message<any>> {
    this.storage.set('user', undefined);
    this.storage.set('loggedIn', false);
    return of(new Message(MessageType.SUCCESS, 'Login Success', {}));
  }
}
