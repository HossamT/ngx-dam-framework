import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { MessageService } from '../services/message.service';

@Injectable()
export class TokenValidGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<any>,
    private messageService: MessageService,
    private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    const token = route.data.token(route);
    const context = route.data.context(route);
    const urlTree = route.data.tokenInvalidUrl ? route.data.tokenInvalidUrl(route) : {
      commands: ['/error'],
    };

    return this.authenticationService.checkLinkToken(token, context).pipe(
      catchError((err: any) => {
        this.store.dispatch(
          this.messageService.actionFromError(err),
        );
        return of(this.router.createUrlTree(urlTree.commands, urlTree.extras));
      }),
      mapTo(true)
    );
  }

}
