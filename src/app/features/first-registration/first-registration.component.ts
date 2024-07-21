import { CompanyService } from './../company/services/company.service';
import { IFormMap } from '../../shared/interfaces/formMap';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../auth/interfaces/Register';

@Component({
  selector: 'app-first-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './first-registration.component.html',
  styleUrl: './first-registration.component.scss'
})
export class FirstRegistrationComponent {

  public firstRegistrationform: any;

  constructor(private fb: FormBuilder, private CompanyService: CompanyService) {

    this.firstRegistrationform = this.fb.group<IFormMap<Register>>({
      name: new FormControl<string>('', Validators.required),
      email: new FormControl(''),
      password: new FormControl(''),
    });

  }


  submit() {
    console.log(this.firstRegistrationform.value);
    this.CompanyService.firstRegistration(this.firstRegistrationform.value).subscribe((data) => {
      console.log(data);
    })
  }

}
