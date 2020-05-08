import { Component, OnInit, ContentChild, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Store } from '@ngrx/store';
import { selectLoaderIsLoading, selectLoaderUiIsBlocked } from '../../../store/loader/loader.selectors';
import { selectIsFullScreen } from '../../../store/data/dam.selectors';
import { BootstrapCheckAuthStatus } from '../../../store/authentication/authentication.actions';

@Component({
  selector: 'dam-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class DamMainComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isFullscreen$: Observable<boolean>;

  @ContentChild('header', { static: true }) header: TemplateRef<any>;
  @ContentChild('footer', { static: true }) footer: TemplateRef<any>;

  @BlockUI() blockUIView: NgBlockUI;

  constructor(private store: Store<any>) {
    // Show Loader
    this.isLoading$ = this.store.select(selectLoaderIsLoading);

    // Block UI
    store.select(selectLoaderUiIsBlocked).subscribe(
      (block) => {
        if (block) {
          this.blockUIView.start();
        } else {
          this.blockUIView.stop();
        }
      },
    );

    // Fullscreen
    this.isFullscreen$ = this.store.select(selectIsFullScreen);
  }

  ngOnInit() {
    this.store.dispatch(new BootstrapCheckAuthStatus());
  }
}
