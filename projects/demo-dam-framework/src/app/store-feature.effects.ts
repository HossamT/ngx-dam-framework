import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { flatMap, map, take } from 'rxjs/operators';
import { DamWidgetEffect } from 'ngx-dam-framework';
import { APP_WIDGET_ID } from './app-dam-widget/app-dam-widget.component';
import { LoadStoreFeatureSuccess, StoreFeatureActions, StoreFeatureActionTypes, OpenPostEditor } from './store-feature.actions';
import { LoadPayloadData } from 'ngx-dam-framework';
import { IPost } from './blog.model';
import { OpenEditor } from 'ngx-dam-framework';
import { Store } from '@ngrx/store';
import { selectPostById } from './store-feature.selectors';
import { LoadResourcesInRepository } from '../../../ngx-dam-framework/src/lib/store/data/dam.actions';

@Injectable()
export class StoreFeatureEffects extends DamWidgetEffect {
  @Effect()
  loadStoreFeatures$ = this.actions$.pipe(
    ofType(StoreFeatureActionTypes.LoadStoreFeatures),
    flatMap(() => {
      const date = new Date();
      return [
        new LoadPayloadData({
          name: 'My Simple Blog',
          posts: [
            {
              id: '1',
              dateCreated: date,
            },
            {
              id: '2',
              dateCreated: date,
            }
          ]
        }),
        new LoadResourcesInRepository<IPost>({
          collections: [{
            key: 'posts',
            values: [
              {
                id: '1',
                type: 'POST',
                title: 'Blog Post 1',
                content: 'My Blog Post Content 1',
                dateCreated: date,
                dateUpdated: date,
              },
              {
                id: '2',
                type: 'POST',
                title: 'Blog Post 2',
                content: 'My Blog Post Content 2',
                dateCreated: date,
                dateUpdated: date,
              }
            ]
          }],
        }),
        new LoadStoreFeatureSuccess(),
      ];
    }),
  );

  @Effect()
  openPostEditor$ = this.actions$.pipe(
    ofType(StoreFeatureActionTypes.OpenPostEditor),
    flatMap((action: OpenPostEditor) => {
      return this.store.select(selectPostById, { id: action.payload.id }).pipe(
        take(1),
        map((post) => {
          return new OpenEditor({
            id: action.payload.id,
            display: {
              title: post.title,
              dateUpdate: post.dateUpdated,
              dateCreated: post.dateCreated,
            },
            editor: {
              id: 'POST_EDITOR',
              title: 'Post Content',
            },
            initial: post,
          });
        }),
      );
    }),
  );

  constructor(
    actions$: Actions<StoreFeatureActions>,
    private store: Store<any>,
  ) {
    super(APP_WIDGET_ID, actions$);
  }
}
