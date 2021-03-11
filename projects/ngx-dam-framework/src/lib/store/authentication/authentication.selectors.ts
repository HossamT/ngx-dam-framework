import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthenticationState } from '../../models/authentication/state';
import { IDamUser } from '../../models/authentication/user.class';

export const authenticationFeatureName = 'damf-authentication';
export const selectAuth = createFeatureSelector<IAuthenticationState>(authenticationFeatureName);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: IAuthenticationState) => state.isLoggedIn,
);

export const selectAuthStatusChecked = createSelector(
  selectAuth,
  (state: IAuthenticationState) => {
    return state.statusChecked;
  },
);


export const selectUserInfo = createSelector(
  selectAuth,
  (state: IAuthenticationState) => {
    if (state.isLoggedIn) {
      return state.userInfo;
    } else {
      return undefined;
    }
  },
);

export const selectUsername = createSelector(
  selectUserInfo,
  (user: IDamUser) => {
    if (user) {
      return user.username;
    } else {
      return undefined;
    }
  },
);

export const selectAuthorities = createSelector(
  selectUserInfo,
  (user: IDamUser) => {
    if (user) {
      return user.roles;
    } else {
      return [];
    }
  },
);

export const selectIsAdmin = createSelector(
  selectUserInfo,
  (user: IDamUser) => {
    return user && user.administrator;
  },
);
