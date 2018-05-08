import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TouchDragToRefreshComponent } from './touch-drag-to-refresh.component';

describe('TouchDragToRefreshComponent', () => {
  let component: TouchDragToRefreshComponent;
  let fixture: ComponentFixture<TouchDragToRefreshComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TouchDragToRefreshComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TouchDragToRefreshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
