import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstRegistrationComponent } from './first-registration.component';

describe('FirstRegistrationComponent', () => {
  let component: FirstRegistrationComponent;
  let fixture: ComponentFixture<FirstRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstRegistrationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FirstRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be valid', () => {
    expect(component.firstRegistrationform.valid).toBeTrue();
  })

  it('form should be invalid', () => {
    component.firstRegistrationform.controls['companyName'].setValue('');
    component.firstRegistrationform.controls['companyEmail'].setValue('');
    component.firstRegistrationform.controls['companyPhone'].setValue('');
    component.firstRegistrationform.controls['userFirstnam'].setValue('');
    component.firstRegistrationform.controls['userLastname'].setValue('');
    component.firstRegistrationform.controls['userEmail'].setValue('');
    component.firstRegistrationform.controls['userPassword'].setValue('');
    expect(component.firstRegistrationform.valid).toBeFalse();
  })

  it('form should be valid', () => {
    component.firstRegistrationform.controls['companyName'].setValue('companyName');
    component.firstRegistrationform.controls['companyEmail'].setValue('companyEmail');
    component.firstRegistrationform.controls['companyPhone'].setValue('companyPhone');
    component.firstRegistrationform.controls['userFirstnam'].setValue('userFirstnam');
    component.firstRegistrationform.controls['userLastname'].setValue('userLastname');
    component.firstRegistrationform.controls['userEmail'].setValue('userEmail');
    component.firstRegistrationform.controls['userPassword'].setValue('userPassword');
    expect(component.firstRegistrationform.valid).toBeTrue();
  })

});