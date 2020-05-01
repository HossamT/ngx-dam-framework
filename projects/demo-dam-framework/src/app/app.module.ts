import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DamFrameworkModule, DamMessagesModule, DamWidgetRoute } from 'ngx-dam-framework';
import { environment } from '../environments/environment.prod';
import { APP_WIDGET_ID, AppDamWidgetComponent } from './app-dam-widget/app-dam-widget.component';
import { AppComponent } from './app.component';
import { LoadStoreFeatures, StoreFeatureActionTypes } from './store-feature.actions';
import { StoreFeatureEffects } from './store-feature.effects';

@NgModule({
  declarations: [
    AppComponent,
    AppDamWidgetComponent,
  ],
  imports: [
    BrowserModule,
    DamFrameworkModule.forRoot(),
    DamMessagesModule.forRoot(),
    RouterModule.forRoot([
      {
        ...DamWidgetRoute({
          widgetId: APP_WIDGET_ID,
          loadAction: LoadStoreFeatures,
          successAction: StoreFeatureActionTypes.LoadStoreSuccess,
          failureAction: StoreFeatureActionTypes.LoadStoreFailure,
          redirectTo: ['error'],
          component: AppDamWidgetComponent,
        }),
        path: 'widget',
      },
    ]),
    EffectsModule.forRoot([StoreFeatureEffects]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
