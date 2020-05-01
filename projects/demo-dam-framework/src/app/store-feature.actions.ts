import { Action } from '@ngrx/store';

export enum StoreFeatureActionTypes {
  LoadStoreFeatures = '[StoreFeature] Load StoreFeatures',
  LoadStoreSuccess = '[StoreFeature] Load Success',
  LoadStoreFailure = '[StoreFeature] Load Failure',
}

export class LoadStoreFeatures implements Action {
  readonly type = StoreFeatureActionTypes.LoadStoreFeatures;
}

export class LoadStoreFeatureSuccess implements Action {
  readonly type = StoreFeatureActionTypes.LoadStoreSuccess;
}

export class LoadStoreFeatureFailure implements Action {
  readonly type = StoreFeatureActionTypes.LoadStoreFailure;
}

export type StoreFeatureActions = LoadStoreFeatures | LoadStoreFeatureSuccess | LoadStoreFeatureFailure;
