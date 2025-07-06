import { Routes } from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'pokemons',
  //   loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  // },

  //?cambios para generar las rutass de los pokemons en tiempo de cosntruccion
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component'),
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component'),
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
