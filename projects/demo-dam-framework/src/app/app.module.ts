import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { APP_WIDGET_ID, AppDamWidgetComponent } from './app-dam-widget/app-dam-widget.component';
import { AppComponent } from './app.component';
import { LoadStoreFeatures, StoreFeatureActionTypes, OpenPostEditor } from './store-feature.actions';
import { StoreFeatureEffects } from './store-feature.effects';
import { ToastrModule } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthenticationMockService } from './authentication.mock.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { EditorActivateGuard } from 'ngx-dam-framework';
import { EditorDeactivateGuard } from 'ngx-dam-framework';
import {
  LoginComponent,
  DamLoaderModule,
  DamAuthenticationModule,
  DamFrameworkModule,
  DamMessagesModule,
  DamWidgetRoute,
  AuthenticatedGuard,
} from 'ngx-dam-framework';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { DamRoutingModule } from '../../../ngx-dam-framework/src/lib/dam-framework.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AppDamWidgetComponent,
    HomeComponent,
    PostEditorComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    DamLoaderModule,
    DamFrameworkModule.forRoot(),
    DamMessagesModule.forRoot(),
    BrowserAnimationsModule,
    DamAuthenticationModule.forRootUsingService(AuthenticationMockService),
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        ...DamWidgetRoute({
          widgetId: APP_WIDGET_ID,
          loadAction: LoadStoreFeatures,
          successAction: StoreFeatureActionTypes.LoadStoreSuccess,
          failureAction: StoreFeatureActionTypes.LoadStoreFailure,
          redirectTo: ['error'],
          component: AppDamWidgetComponent,
        }, {
          canActivate: [AuthenticatedGuard],
          canDeactivate: [],
        }),
        path: 'widget',
        children: [
          {
            component: PostEditorComponent,
            path: 'post/:postId',
            canActivate: [EditorActivateGuard],
            canDeactivate: [EditorDeactivateGuard],
            data: {
              editorMetadata: {
                id: 'POST_EDITOR',
                title: 'Post Content',
              },
              onLeave: {
                saveEditor: true,
                saveTableOfContent: true,
              },
              action: OpenPostEditor,
              idKey: 'postId',
            },
          },
        ],
      },
    ]),
    DamRoutingModule,
    EffectsModule.forRoot([StoreFeatureEffects]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(),
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
