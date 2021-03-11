import { Component, OnInit, ContentChild, TemplateRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Store } from '@ngrx/store';
import { selectLoaderIsLoading, selectLoaderUiIsBlocked } from '../../../store/loader/loader.selectors';
import { selectIsFullScreen } from '../../../store/data/dam.selectors';
import { BootstrapCheckAuthStatus } from '../../../store/authentication/authentication.actions';
import { delay, tap } from 'rxjs/operators';

@Component({
  selector: 'dam-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class DamMainComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading: boolean;
  isFullscreen: boolean;


  @ContentChild('header', { static: true }) header: TemplateRef<any>;
  @ContentChild('footer', { static: true }) footer: TemplateRef<any>;

  @BlockUI() blockUIView: NgBlockUI;
  loader: Subscription;
  fscreen: Subscription;
  uiBlock: Subscription;

  constructor(private store: Store<any>) { }

  ngAfterViewInit() {
    // Block UI
    this.uiBlock = this.store.select(selectLoaderUiIsBlocked).subscribe(
      (block) => {
        if (block) {
          this.blockUIView.start();
        } else {
          this.blockUIView.stop();
        }
      },
    );
  }

  ngOnDestroy() {
    this.loader.unsubscribe();
    this.uiBlock.unsubscribe();
    this.fscreen.unsubscribe();
  }

  ngOnInit() {
    this.store.dispatch(new BootstrapCheckAuthStatus());
    // Show Loader
    this.loader = this.store.select(selectLoaderIsLoading).pipe(
      delay(0),
      tap((b) => {
        this.isLoading = b;
      })
    ).subscribe();

    // Fullscreen
    this.fscreen = this.store.select(selectIsFullScreen).pipe(
      delay(0),
      tap((b) => {
        this.isFullscreen = b;
      })
    ).subscribe();
  }
}
