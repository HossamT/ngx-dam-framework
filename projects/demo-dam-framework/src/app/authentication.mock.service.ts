import { AuthenticationService } from 'ngx-dam-framework';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Message } from 'ngx-dam-framework';
import { MessageType } from '../../../ngx-dam-framework/src/lib/models/messages/message.class';
import { User } from '../../../ngx-dam-framework/src/lib/models/authentication/user.class';
import { of, Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { flatMap } from 'rxjs/operators';

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

  login(username: string, password: string): Observable<Message<User>> {
    const user = new User(username, []);
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

  checkAuthStatus(): Observable<User> {
    return this.storage.get('loggedIn').pipe(
      flatMap((value) => {
        console.log(value);
        if (value) {
          return this.storage.get<User>('user') as Observable<User>;
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
