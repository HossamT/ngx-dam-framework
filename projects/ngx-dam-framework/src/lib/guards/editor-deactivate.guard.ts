import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/fragments/confirm-dialog/confirm-dialog.component';
import { DamAbstractEditorComponent } from '../services/dam-editor.component';
import { DamActionTypes, GlobalSave } from '../store/data/dam.actions';
import { selectWorkspaceCurrentIsChanged, selectWorkspaceCurrentIsValid } from '../store/data/dam.selectors';

@Injectable()
export class EditorDeactivateGuard implements CanDeactivate<DamAbstractEditorComponent> {

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private dialog: MatDialog,
  ) { }

  canDeactivate(
    component: DamAbstractEditorComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot,
  ) {
    return combineLatest([
      this.store.select(selectWorkspaceCurrentIsChanged),
      this.store.select(selectWorkspaceCurrentIsValid),
    ]).pipe(
      take(1),
      concatMap(([editorChanged, editorValid]) => {
        if (!editorValid) {
          // TOGGLE INVALID DIALOG
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              question: 'You have invalid data in your form, leaving will result in unsaved work. Do you want to leave ?',
              action: 'Invalid Data',
            },
          });

          return dialogRef.afterClosed().pipe(
            map((answer: boolean) => answer),
          );
        } else {
          if (editorChanged) {
            this.store.dispatch(new GlobalSave());
            return this.actions$.pipe(
              ofType(DamActionTypes.EditorSaveSuccess, DamActionTypes.EditorSaveFailure),
              map((action: Action) => {
                switch (action.type) {
                  case DamActionTypes.EditorSaveSuccess:
                    component.onDeactivate();
                    return true;
                  case DamActionTypes.EditorSaveFailure:
                    return false;
                }
              }),
            );
          } else {
            return of(true).pipe(
              tap(() => component ? component.onDeactivate() : null),
            );
          }
        }
      }),
    );

  }
}
