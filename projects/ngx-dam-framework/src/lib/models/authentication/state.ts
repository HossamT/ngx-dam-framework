import { IDamUser } from './user.class';

export interface IAuthenticationState {
  statusChecked: boolean;
  isLoggedIn: boolean;
  userInfo: IDamUser;
}

export const emptyUserState: IAuthenticationState = {
  statusChecked: false,
  isLoggedIn: false,
  userInfo: null,
};
