import { InjectionToken } from '@angular/core';
import { IUserMessageOptions } from './models/messages/message.class';
import { IAuthenticationConfig, UserTransformer } from './services/authentication.service';
import { IDamUser } from './models/authentication/user.class';

export const DEFAULT_MESSAGE_OPTION: InjectionToken<IUserMessageOptions> = new InjectionToken<IUserMessageOptions>('USER_MESSAGE_TOKEN');
export const DAM_AUTH_CONFIG: InjectionToken<IAuthenticationConfig> = new InjectionToken<IAuthenticationConfig>('AUTH_CONFIG');
export const DAM_AUTH_USER_TRANSFORMER: InjectionToken<UserTransformer<any, IDamUser>> = new InjectionToken<UserTransformer<any, IDamUser>>('AUTH_USER_TRANSFORMER');
