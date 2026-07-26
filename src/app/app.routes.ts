import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./legal/privacy-policy.component').then((m) => m.PrivacyPolicyComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./legal/terms-conditions.component').then((m) => m.TermsConditionsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
