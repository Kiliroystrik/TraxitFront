import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  login() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: () => {
        console.log('error')
      }
    })
  }

}
