import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // Public routes
    {
        path: 'register',
        loadComponent: () => import('./features/first-registration/first-registration.component').then(m => m.FirstRegistrationComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '',
        loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent)
    },

    // Protected routes
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },

    // Tour management routes
    {
        path: 'gestion-des-tournees',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/tour-managment/tour-managment.component').then(m => m.TourManagmentComponent),
                canActivate: [authGuard]
            },
            {
                path: ':id',
                loadComponent: () => import('./features/tour/components/tour-details/tour-details.component').then(m => m.TourDetailsComponent),
                canActivate: [authGuard]
            }
        ]
    },

    // Client management routes
    {
        path: 'gestion-des-clients',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/client-managment/client-managment.component').then(m => m.ClientManagmentComponent),
                canActivate: [authGuard]
            },
            {
                path: ':id',
                loadComponent: () => import('./features/client/components/client-details/client-details.component').then(m => m.ClientDetailsComponent),
                canActivate: [authGuard]
            }
        ]
    },

    // Order management routes
    {
        path: 'gestion-des-commandes',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/order-managment/order-managment.component').then(m => m.OrderManagmentComponent),
                canActivate: [authGuard]
            },
            {
                path: ':id',
                loadComponent: () => import('./features/order/components/order-details/order-details.component').then(m => m.OrderDetailsComponent),
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'creation-commande',
        loadComponent: () => import('./features/order/components/order-form/order-form.component').then(m => m.OrderFormComponent),
        canActivate: [authGuard]
    },

    // Wildcard route for a 404 page
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
