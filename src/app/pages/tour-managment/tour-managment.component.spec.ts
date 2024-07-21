import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourManagmentComponent } from './tour-managment.component';

describe('TourManagmentComponent', () => {
  let component: TourManagmentComponent;
  let fixture: ComponentFixture<TourManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourManagmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TourManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
