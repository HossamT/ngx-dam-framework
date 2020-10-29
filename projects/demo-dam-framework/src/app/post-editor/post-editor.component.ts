import { Component } from '@angular/core';
import { DamAbstractEditorComponent, EditorSave } from 'ngx-dam-framework';
import { Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { EMPTY, Observable } from 'rxjs';
import { MessageService } from 'ngx-dam-framework';
import { UserMessage } from 'projects/ngx-dam-framework/src/public_api';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent extends DamAbstractEditorComponent {

  persist = false;
  constructor(actions$: Actions, store: Store<any>, private messageService: MessageService) {
    super({
      id: 'POST_EDITOR',
      title: 'Post Content',
    },
      actions$,
      store);
  }

  alert(type) {
    this.store.dispatch(
      this.messageService.userMessageToAction(new UserMessage(type, 'Alert!', null, {
        persistSuccess: this.persist,
      })),
    );
  }

  onEditorSave(action: EditorSave): Observable<Action> {
    console.error('Method not implemented.');
    return EMPTY;
  }
  editorDisplayNode(): Observable<any> {
    console.error('Method not implemented.');
    return EMPTY;
  }

  onDeactivate(): void {
  }

}
