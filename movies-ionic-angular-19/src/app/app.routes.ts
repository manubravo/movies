import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';
import { NavTabsComponent } from './view/shared/nav-tabs/nav-tabs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    loadComponent: () => import('./view/pages/login/login.page').then(m => m.LoginPage), 
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    loadComponent: () => import('./view/pages/register/register.page').then(m => m.RegisterPage), 
    canActivate: [guestGuard]
  },
  {
    path: 'tabs',
    component: NavTabsComponent,
    canActivate: [authGuard], 
    children: [
      { path: 'latest', loadComponent: () => import('./view/pages/latest/latest.page').then(m => m.LatestPage) },
      { path: 'populars', loadComponent: () => import('./view/pages/populars/populars.page').then(m => m.PopularsPage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { 
    path: 'details/:id', 
    loadComponent: () => import('./view/pages/details/details.page').then(m => m.DetailsPage), 
    canActivate: [authGuard] 
  },
  { 
    path: '**', 
    redirectTo: 'tabs/latest' 
  }
];