import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
    data: { prerender: false },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component'),
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component'),
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component'),
  },
  {
    path: '**',
    redirectTo: 'about',
    // esto tambien se  puede hacer en caso de ser necesario
    // redirectTo: () =>{
    //   const authService = inject(AuthService);

    //   return 'about';
    // }
  },
];
