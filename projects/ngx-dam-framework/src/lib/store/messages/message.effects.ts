import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { MessageType } from '../../models/messages/message.class';
import { MessagesActions, MessagesActionTypes } from './messages.actions';

@Injectable()
export class MessagesEffects {

  @Effect({
    dispatch: false,
  })
  notify$ = this.actions$.pipe(
    ofType(MessagesActionTypes.Notify),
    tap((action) => {
      const toastOptions: Partial<IndividualConfig> = {
        closeButton: action.payload.options.closable,
        timeOut: action.payload.options.timeout,
      };

      switch (action.payload.status) {
        case MessageType.INFO:
          this.toastyService.info(action.payload.message, '', toastOptions);
          break;
        case MessageType.SUCCESS:
          this.toastyService.success(action.payload.message, '', toastOptions);
          break;
        case MessageType.FAILED:
          this.toastyService.error(action.payload.message, '', toastOptions);
          break;
        case MessageType.WARNING:
          this.toastyService.warning(action.payload.message, '', toastOptions);
          break;
        default:
          this.toastyService.show(action.payload.message, '', toastOptions);
      }
    }),
  );

  constructor(
    private actions$: Actions<MessagesActions>,
    private toastyService: ToastrService,
  ) { }

}

export type NotificationSeverity = 'success' | 'info' | 'warn' | 'error';
