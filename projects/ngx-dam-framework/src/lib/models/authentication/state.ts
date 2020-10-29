import { IDamUser } from './user.class';

export interface IAuthenticationState {
  isLoggedIn: boolean;
  userInfo: IDamUser;
}

export const emptyUserState: IAuthenticationState = {
  isLoggedIn: false,
  userInfo: null,
};
