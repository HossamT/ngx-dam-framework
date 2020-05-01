import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDamWidgetComponent } from './app-dam-widget.component';

describe('AppDamWidgetComponent', () => {
  let component: AppDamWidgetComponent;
  let fixture: ComponentFixture<AppDamWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppDamWidgetComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDamWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
