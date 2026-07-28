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
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent)
  },
  {
    path: 'security',
    loadComponent: () =>
      import('./pages/security/security.component').then((m) => m.SecurityComponent)
  },
  {
    path: 'careers',
    loadComponent: () =>
      import('./pages/careers/careers.component').then((m) => m.CareersComponent)
  },
  {
    path: 'faq',
    loadComponent: () => import('./pages/faq/faq.component').then((m) => m.FaqComponent)
  },
  {
    path: 'cookies',
    loadComponent: () =>
      import('./pages/cookies/cookies.component').then((m) => m.CookiesComponent)
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent)
  }
];
