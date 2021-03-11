import { emptyUserState, IAuthenticationState } from '../../models/authentication/state';
import { AuthenticationActions, AuthenticationActionTypes } from './authentication.actions';

export function authenticationReducer(state = emptyUserState, action: AuthenticationActions): IAuthenticationState {
  // tslint:disable-next-line: no-small-switch
  switch (action.type) {

    case AuthenticationActionTypes.UpdateAuthStatus:
      return {
        statusChecked: action.payload.statusChecked,
        isLoggedIn: action.payload.isLoggedIn,
        userInfo: action.payload.userInfo,
      };

    default:
      return state;
  }
}
