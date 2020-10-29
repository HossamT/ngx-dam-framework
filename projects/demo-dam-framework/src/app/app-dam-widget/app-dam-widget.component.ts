import { Component, forwardRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DamWidgetComponent } from 'ngx-dam-framework';
import { Observable, forkJoin } from 'rxjs';
import { IBlog, IPost } from '../blog.model';
import { selectMyBlog, selectPostById } from '../store-feature.selectors';
import { flatMap, take, filter, tap } from 'rxjs/operators';

export const APP_WIDGET_ID = 'APP_WIDGET_ID';

@Component({
  selector: 'app-app-dam-widget',
  templateUrl: './app-dam-widget.component.html',
  styleUrls: ['./app-dam-widget.component.css'],
  providers: [
    { provide: DamWidgetComponent, useExisting: forwardRef(() => AppDamWidgetComponent) },
  ],
})
export class AppDamWidgetComponent extends DamWidgetComponent implements OnInit {

  blog$: Observable<IBlog>;
  posts$: Observable<IPost[]>;

  constructor(
    store: Store<any>,
    dialog: MatDialog,
  ) {
    super(APP_WIDGET_ID, store, dialog);
    this.blog$ = this.store.select(selectMyBlog);
    this.posts$ = this.store.select(selectMyBlog).pipe(
      filter((a) => !!a),
      flatMap((blog: IBlog) => {
        const obs = blog.posts.map(postLink => {
          return this.store.select(selectPostById, { id: postLink.id }).pipe(
            filter((a) => !!a),
            take(1));
        });
        return forkJoin(obs);
      }),
    );
  }

  ngOnInit() {
  }

}
