import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { flatMap } from 'rxjs/operators';
import { DamWidgetEffect } from '../../../ngx-dam-framework/src/lib/store/dam-widget-effect.class';
import { APP_WIDGET_ID } from './app-dam-widget/app-dam-widget.component';
import { LoadStoreFeatureSuccess, StoreFeatureActions, StoreFeatureActionTypes } from './store-feature.actions';

@Injectable()
export class StoreFeatureEffects extends DamWidgetEffect {
  @Effect()
  loadStoreFeatures$ = this.actions$.pipe(
    ofType(StoreFeatureActionTypes.LoadStoreFeatures),
    flatMap(() => {
      return [
        new LoadStoreFeatureSuccess(),
      ];
    }),
  );

  constructor(actions$: Actions<StoreFeatureActions>) {
    super(APP_WIDGET_ID, actions$);
  }
}
