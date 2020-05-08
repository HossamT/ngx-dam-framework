import { Component } from '@angular/core';
import { DamAbstractEditorComponent, EditorSave } from 'ngx-dam-framework';
import { Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.css']
})
export class PostEditorComponent extends DamAbstractEditorComponent {

  constructor(actions$: Actions, store: Store<any>) {
    super({
      id: 'POST_EDITOR',
      title: 'Post Content',
    },
      actions$,
      store);
  }

  onEditorSave(action: EditorSave): Observable<Action> {
    // tslint:disable-next-line: no-duplicate-string
    throw new Error('Method not implemented.');
  }
  editorDisplayNode(): Observable<any> {
    throw new Error('Method not implemented.');
  }
  onDeactivate(): void {
    throw new Error('Method not implemented.');
  }

}
