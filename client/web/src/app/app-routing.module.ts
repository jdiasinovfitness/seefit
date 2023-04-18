import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        m => m.AuthenticationModule
      ),
  },
  {
    path: 'platform',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/platform/platform.module').then(m => m.PlatformModule),
  },
  {
    path: '**',
    redirectTo: '/platform',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
