import { Action } from '@ngrx/store';

export enum LoaderActionTypes {
  TurnOnLoader = '[DAMF Loader] Start Loading',
  TurnOffLoader = '[DAMF Loader] Finish Loading',
}

export class TurnOnLoader implements Action {
  readonly type = LoaderActionTypes.TurnOnLoader;

  constructor(readonly payload: {
    blockUI: boolean,
  }) {
  }
}

export class TurnOffLoader implements Action {
  readonly type = LoaderActionTypes.TurnOffLoader;

  constructor(readonly force: boolean = false) {
  }
}

export type LoaderActions = TurnOnLoader | TurnOffLoader;
