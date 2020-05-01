import { Component, forwardRef, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DamWidgetComponent } from 'ngx-dam-framework';

export const APP_WIDGET_ID = 'APP_WIDGET_ID';

@Component({
  selector: 'app-app-dam-widget',
  templateUrl: './app-dam-widget.component.html',
  styleUrls: ['./app-dam-widget.component.css'],
  providers: [
    { provide: DamWidgetComponent, useExisting: forwardRef(() => AppDamWidgetComponent) },
  ],
})
export class AppDamWidgetComponent extends DamWidgetComponent implements OnInit {

  constructor(
    store: Store<any>,
    dialog: MatDialog,
  ) {
    super(APP_WIDGET_ID, store, dialog);
  }

  ngOnInit() {
  }

}
