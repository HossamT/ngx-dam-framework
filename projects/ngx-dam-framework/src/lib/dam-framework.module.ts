import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import * as fromRouter from '@ngrx/router-store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { ToastrModule } from 'ngx-toastr';
import { CardModule } from 'primeng/card';
import { DamAlertsContainerComponent } from './components/alerts/dam-alerts-container/dam-alerts-container.component';
import { DamAlertsComponent } from './components/alerts/dam-alerts/dam-alerts.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { TimeoutLoginDialogComponent } from './components/authentication/timeout-login-dialog/timeout-login-dialog.component';
import { UserManagementHeaderComponent } from './components/authentication/user-management-header/user-management-header.component';
import { DamEditorOutletComponent } from './components/data-widget/dam-editor-outlet/dam-editor-outlet.component';
import { DamFullscreenButtonComponent } from './components/data-widget/dam-fullscreen-button/dam-fullscreen-button.component';
import { DamLayoutComponent } from './components/data-widget/dam-layout/dam-layout.component';
import { DamResetButtonComponent } from './components/data-widget/dam-reset-button/dam-reset-button.component';
import { DamSaveButtonComponent } from './components/data-widget/dam-save-button/dam-save-button.component';
import { DamSideBarToggleComponent } from './components/data-widget/dam-side-bar-toggle/dam-side-bar-toggle.component';
import { DamWidgetContainerComponent } from './components/data-widget/dam-widget-container/dam-widget-container.component';
import { ConfirmDialogComponent } from './components/fragments/confirm-dialog/confirm-dialog.component';
import { AuthenticatedGuard, NotAuthenticatedGuard } from './guards/auth-guard.guard';
import { DataLoaderGuard } from './guards/data-loader.guard';
import { EditorActivateGuard } from './guards/editor-activate.guard';
import { EditorDeactivateGuard } from './guards/editor-deactivate.guard';
import { AuthInterceptor } from './guards/logout-interceptor.service';
import { NewPasswordResolver } from './guards/new-password.resolver';
import { WidgetDeactivateGuard } from './guards/widget-deactivate.guard';
import { WidgetSetupGuard } from './guards/widget-setup.guard';
import { DAM_AUTH_CONFIG, DEFAULT_MESSAGE_OPTION } from './injection-token';
import { AuthenticationService, IAuthenticationURL } from './services/authentication.service';
import { MessageService } from './services/message.service';
import { AuthenticationEffects } from './store/authentication/authentication.effects';
import * as fromAuthReducer from './store/authentication/authentication.reducer';
import * as fromAuthSelector from './store/authentication/authentication.selectors';
import * as fromDataReducer from './store/data/dam.reducer';
import * as fromDataSelector from './store/data/dam.selectors';
import * as fromLoaderReducer from './store/loader/loader.reducer';
import * as fromLoaderSelector from './store/loader/loader.selectors';
import { MessagesEffects } from './store/messages/message.effects';
import * as fromMessagesReducer from './store/messages/messages.reducer';
import * as fromMessagesSelector from './store/messages/messages.selectors';
import * as fromRouterSelector from './store/router/router.selectors';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BlockUIModule } from 'ng-block-ui';
import { DamMainComponent } from './components/data-widget/main/main.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    ConfirmDialogComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
  ],
})
export class DamComponentsModule {
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromRouterSelector.routerFeatureName, fromRouter.routerReducer),
  ],
  exports: [
  ],
  entryComponents: [
  ],
})
export class DamRoutingModule {
}

@NgModule({
  declarations: [
    DamLayoutComponent,
    DamEditorOutletComponent,
    DamSaveButtonComponent,
    DamResetButtonComponent,
    DamFullscreenButtonComponent,
    DamSideBarToggleComponent,
    DamWidgetContainerComponent,
    DamMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatProgressBarModule,
    DamComponentsModule,
    BlockUIModule,
    StoreModule.forFeature(fromDataSelector.featureName, fromDataReducer.reducer),
  ],
  exports: [
    DamLayoutComponent,
    DamEditorOutletComponent,
    DamSaveButtonComponent,
    DamResetButtonComponent,
    DamFullscreenButtonComponent,
    DamSideBarToggleComponent,
    DamWidgetContainerComponent,
    DamMainComponent,
  ],
})
export class DamFrameworkModule {

  static forRoot(): ModuleWithProviders<DamFrameworkModule> {
    return {
      ngModule: DamFrameworkModule,
      providers: [
        DataLoaderGuard,
        EditorActivateGuard,
        EditorDeactivateGuard,
        WidgetSetupGuard,
        WidgetDeactivateGuard,
      ],
    };
  }
}

@NgModule({
  declarations: [
    DamAlertsComponent,
    DamAlertsContainerComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ToastrModule,
    EffectsModule.forFeature([MessagesEffects]),
    StoreModule.forFeature(fromMessagesSelector.messageFeatureName, fromMessagesReducer.messagesReducer),
  ],
  exports: [
    DamAlertsComponent,
    DamAlertsContainerComponent,
  ],
})
export class DamMessagesModule {

  static forRoot(): ModuleWithProviders<DamMessagesModule> {
    return {
      ngModule: DamMessagesModule,
      providers: [
        MessageService,
        {
          provide: DEFAULT_MESSAGE_OPTION,
          useValue: {
            closable: true,
            timeout: 2000,
          },
        },
      ],
    };
  }
}

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(fromLoaderSelector.loaderFeatureName, fromLoaderReducer.loaderReducer),
  ],
  exports: [],
})
export class DamLoaderModule { }

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent,
    UserManagementHeaderComponent,
    TimeoutLoginDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DamComponentsModule,
    CardModule,
    DamMessagesModule,
    NgbModule,
    StoreModule.forFeature(fromAuthSelector.authenticationFeatureName, fromAuthReducer.authenticationReducer),
    EffectsModule.forFeature([AuthenticationEffects]),
  ],
  exports: [
    LoginComponent,
    LoginFormComponent,
    UserManagementHeaderComponent,
    TimeoutLoginDialogComponent,
  ],
  entryComponents: [
    TimeoutLoginDialogComponent,
  ],
})
export class DamAuthenticationModule {

  static forRootUsingUrl(urls: IAuthenticationURL): ModuleWithProviders<DamAuthenticationModule> {
    return {
      ngModule: DamAuthenticationModule,
      providers: [
        AuthenticationService,
        NewPasswordResolver,
        AuthenticatedGuard,
        NotAuthenticatedGuard,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: DAM_AUTH_CONFIG, useValue: urls },
      ],
    };
  }

  static forRootUsingService<T extends AuthenticationService>(service: Type<T>): ModuleWithProviders<DamAuthenticationModule> {
    return {
      ngModule: DamAuthenticationModule,
      providers: [
        { provide: AuthenticationService, useClass: service },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: DAM_AUTH_CONFIG, useValue: {} },
        NewPasswordResolver,
        AuthenticatedGuard,
        NotAuthenticatedGuard,
      ],
    };
  }
}
