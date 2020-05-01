/*
 * Public API Surface of ngx-dam-framework
 */

import { from } from 'rxjs';

// Modules
export * from './lib/dam-framework.module';

// Injection Tokens
export * from './lib/injection-token';

// Guards
export * from './lib/guards/auth-guard.guard';
export * from './lib/guards/data-loader.guard';
export * from './lib/guards/editor-activate.guard';
export * from './lib/guards/editor-deactivate.guard';
export * from './lib/guards/logout-interceptor.service';
export * from './lib/guards/new-password.resolver';
export * from './lib/guards/widget-deactivate.guard';
export * from './lib/guards/widget-setup.guard';

// Services
export * from './lib/services/authentication.service';
export * from './lib/services/dam-editor.component';
export * from './lib/services/message.service';
export * from './lib/services/router-helpers.service';
export * from './lib/services/rxjs-store-helper.service';

// Store
export * from './lib/store/index';

// Components

// [Alerts]
export * from './lib/components/alerts/dam-alerts/dam-alerts.component';
export * from './lib/components/alerts/dam-alerts-container/dam-alerts-container.component';

// [Authentication]
export * from './lib/components/authentication/login/login.component';
export * from './lib/components/authentication/login-form/login-form.component';
export * from './lib/components/authentication/timeout-login-dialog/timeout-login-dialog.component';
export * from './lib/components/authentication/user-management-header/user-management-header.component';

// [Widget]
export * from './lib/components/data-widget/dam-editor-outlet/dam-editor-outlet.component';
export * from './lib/components/data-widget/dam-fullscreen-button/dam-fullscreen-button.component';
export * from './lib/components/data-widget/dam-layout/dam-layout.component';
export * from './lib/components/data-widget/dam-reset-button/dam-reset-button.component';
export * from './lib/components/data-widget/dam-save-button/dam-save-button.component';
export * from './lib/components/data-widget/dam-side-bar-toggle/dam-side-bar-toggle.component';
export * from './lib/components/data-widget/dam-widget/dam-widget.component';
export * from './lib/components/data-widget/dam-widget-container/dam-widget-container.component';

// [Fragments]
export * from './lib/components/fragments/confirm-dialog/confirm-dialog.component';

// Models
// [Authentication]
export * from './lib/models/authentication/registration.class';
export * from './lib/models/authentication/state';
export * from './lib/models/authentication/user.class';

// [Data]
export * from './lib/models/data/repository';
export * from './lib/models/data/state';
export * from './lib/models/data/workspace';

// [Loader]
export * from './lib/models/loader/state';

// [Messages]
export * from './lib/models/messages/message-options.class';
export * from './lib/models/messages/message.class';
export * from './lib/models/messages/notification.class';
export * from './lib/models/messages/state';
