import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, tap, flatMap, filter } from 'rxjs/operators';
import { IAuthenticationState } from '../models/authentication/state';
import { AuthenticationService } from '../services/authentication.service';
import * as fromAuth from '../store/authentication/index';
import { selectAuthStatusChecked } from '../store/authentication/authentication.selectors';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<IAuthenticationState>,
    private authService: AuthenticationService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectAuthStatusChecked).pipe(
      filter((checked) => checked),
      flatMap(() => {
        return this.store.select(fromAuth.selectIsLoggedIn)
          .pipe(
            tap((logged) => {
              if (!logged) {
                this.router.navigate([this.authService.getLoginPageRedirectUrl()], {
                  queryParams: {
                    return: state.url,
                  },
                });
              }
            }),
          );
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private store: Store<IAuthenticationState>,
    private authService: AuthenticationService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(selectAuthStatusChecked).pipe(
      filter((checked) => checked),
      flatMap(() => {
        return this.store.select(fromAuth.selectIsLoggedIn)
          .pipe(
            map((logged) => {
              if (logged) {
                this.router.navigate([this.authService.getUnprotectedRedirectUrl()]);
              }
              return !logged;
            }),
          );
      })
    );
  }

}
@Injectable({
  providedIn: 'root',
})
export class UserPredicateGuard implements CanActivate {
  constructor(
    private store: Store<IAuthenticationState>,
    private authService: AuthenticationService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const predicate = route.data.predicate || (() => true);
    return this.store.select(selectAuthStatusChecked).pipe(
      filter((checked) => checked),
      flatMap(() => {
        return this.store.select(fromAuth.selectIsLoggedIn)
          .pipe(
            flatMap((logged) => {
              if (logged) {
                return this.store.select(fromAuth.selectUserInfo).pipe(
                  map((user) => {
                    if (user && predicate(user)) {
                      return true;
                    } else {
                      this.router.navigate([this.authService.getUnprotectedRedirectUrl()]);
                      return false;
                    }
                  })
                );
              } else {
                return of(false);
              }
            }),
          );
      })
    );
  }

}
