import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'TraxitFront';
  username: string | null = null;
  usernameSubscription: Subscription | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.usernameSubscription = this.authService.username.subscribe(username => {
      this.username = username;
    });
  }

  ngOnDestroy(): void {
    this.usernameSubscription?.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
