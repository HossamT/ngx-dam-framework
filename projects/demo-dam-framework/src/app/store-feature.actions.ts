import { Action } from '@ngrx/store';
import { OpenEditorBase, IEditorMetadata } from 'ngx-dam-framework';

export enum StoreFeatureActionTypes {
  LoadStoreFeatures = '[StoreFeature] Load StoreFeatures',
  LoadStoreSuccess = '[StoreFeature] Load Success',
  LoadStoreFailure = '[StoreFeature] Load Failure',
  OpenPostEditor = '[StoreFeature] Open Post Editor',
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

export class OpenPostEditor implements OpenEditorBase {
  readonly type = StoreFeatureActionTypes.OpenPostEditor;
  constructor(readonly payload: { id: string, editor: IEditorMetadata }) { }
}

export type StoreFeatureActions = LoadStoreFeatures | LoadStoreFeatureSuccess | LoadStoreFeatureFailure | OpenPostEditor;
