import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepModalComponent } from './step-modal.component';

describe('StepModalComponent', () => {
  let component: StepModalComponent;
  let fixture: ComponentFixture<StepModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
