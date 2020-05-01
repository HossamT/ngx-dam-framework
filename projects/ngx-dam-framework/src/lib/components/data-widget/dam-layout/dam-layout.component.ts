import { AfterViewInit, Component, ContentChild, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { filter, repeat, skipUntil, takeUntil, tap } from 'rxjs/operators';
import { DamWidgetComponent } from '../dam-widget/dam-widget.component';

@Component({
  selector: 'dam-layout',
  templateUrl: './dam-layout.component.html',
  styleUrls: ['./dam-layout.component.scss'],
})
export class DamLayoutComponent implements OnInit, OnDestroy, AfterViewInit {

  // --- Templates
  @ContentChild('alerts', { static: false })
  alertsTemplate: TemplateRef<any>;

  @ContentChild('titleBar', { static: false })
  titleBarTemplate: TemplateRef<any>;

  @ContentChild('toolbar', { static: false })
  toolbarTemplate: TemplateRef<any>;

  @ContentChild('activeTitleBar', { static: false })
  activeTitlebarTemplate: TemplateRef<any>;

  @ContentChild('editorContent', { static: false })
  editorContentTemplate: TemplateRef<any>;

  @ContentChild('sideBar', { static: false })
  sideBarTemplate: TemplateRef<any>;

  // --- Resize Attributes
  @ViewChild('resize', { read: ElementRef, static: true })
  resize: ElementRef;
  dragging: boolean;
  positionX: string;
  resizeTocSubscription: Subscription;

  // --- Collapse Attributes
  collapsed: boolean;
  tocCollapseSubscription: Subscription;

  constructor(public widget: DamWidgetComponent) {
    if (widget == null) {
      throw new Error('DamLayout should be used inside a DamWidget');
    }

    this.tocCollapseSubscription = widget.sideBarCollapseStatus$().subscribe(
      (collapsed) => {
        this.collapsed = collapsed;
      },
    );
  }

  expandSideBar() {
    return this.widget.showSideBar();
  }

  ngAfterViewInit(): void {
    if (this.resize) {
      const move$ = fromEvent(document, 'mousemove');
      const down$ = fromEvent(this.resize.nativeElement, 'mousedown');
      const up$ = fromEvent(document, 'mouseup');
      if (!this.resizeTocSubscription || this.resizeTocSubscription.closed) {
        this.resizeTocSubscription = move$.pipe(
          skipUntil(down$),
          filter(() => !this.collapsed),
          tap((event: MouseEvent) => {
            this.dragging = true;
            this.positionX = event.clientX + 'px';
          }),
          takeUntil(up$),
          repeat(),
        ).subscribe();
      }
      up$.pipe(
        tap(() => {
          this.dragging = false;
        }),
      ).subscribe();
    }
  }

  ngOnDestroy() {
    this.resizeTocSubscription.unsubscribe();
  }

  ngOnInit() {
  }

}
