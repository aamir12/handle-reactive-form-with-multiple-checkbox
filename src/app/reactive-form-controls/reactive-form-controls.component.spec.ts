import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormControlsComponent } from './reactive-form-controls.component';

describe('ReactiveFormControlsComponent', () => {
  let component: ReactiveFormControlsComponent;
  let fixture: ComponentFixture<ReactiveFormControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
