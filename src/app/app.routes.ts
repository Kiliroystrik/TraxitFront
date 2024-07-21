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
        path: 'gestion-des-tournees/:id',
        loadComponent: () => import('./features/tour/components/tour-details/tour-details.component').then(m => m.TourDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'gestion-des-tournees',
        loadComponent: () => import('./pages/tour-managment/tour-managment.component').then(m => m.TourManagmentComponent),
        canActivate: [authGuard]
    },
    {
        path: 'gestion-des-clients/:id',
        loadComponent: () => import('./features/client/components/client-details/client-details.component').then(m => m.ClientDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'gestion-des-clients',
        loadComponent: () => import('./pages/client-managment/client-managment.component').then(m => m.ClientManagmentComponent),
        canActivate: [authGuard]
    },
    {
        path: 'gestion-des-commandes/:id',
        loadComponent: () => import('./features/order/components/order-details/order-details.component').then(m => m.OrderDetailsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'gestion-des-commandes',
        loadComponent: () => import('./pages/order-managment/order-managment.component').then(m => m.OrderManagmentComponent),
        canActivate: [authGuard]
    },
    {
        path: 'creation-commande',
        loadComponent: () => import('./features/order/components/order-form/order-form.component').then(m => m.OrderFormComponent),
        canActivate: [authGuard]
    },
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    }
];
