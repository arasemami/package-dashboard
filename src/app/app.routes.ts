import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'packages', pathMatch: 'full' },
  {
    path: 'packages',
    loadChildren: () =>
      import('./packages/packages.module').then((m) => m.PackagesModule),
  },
  // You can add other lazy-loaded feature routes here
  // Example:
  // {
  //   path: 'users',
  //   loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
  // },
  { path: '**', redirectTo: 'packages' }, // catch-all route
];
