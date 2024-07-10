import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent: () => import('./features/first-registration/first-registration.component').then(m => m.FirstRegistrationComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tournees',
        loadComponent: () => import('./features/tour/tour-list/tour-list.component').then(m => m.TourListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tournees/:id',
        loadComponent: () => import('./features/tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    }
];
