import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'register',
        loadComponent: () => import('./first-registration/first-registration.component').then(m => m.FirstRegistrationComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tournees',
        loadComponent: () => import('./tour/tour-list/tour-list.component').then(m => m.TourListComponent),
        canActivate: [authGuard]
    },
    {
        path: 'tournees/:id',
        loadComponent: () => import('./tour/tour-details/tour-details.component').then(m => m.TourDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        loadComponent: () => import('./landing-page/landing-page.component').then(m => m.LandingPageComponent)
    }
];
