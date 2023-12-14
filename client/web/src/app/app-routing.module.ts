import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/services/guards/auth_guard.service';
import { noAuthGuard } from './core/services/guards/no_auth_guard.service';
import { configGuard } from './core/services/guards/config_guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canActivate: [noAuthGuard],
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'platform',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./modules/platform/platform.module').then(
        (m) => m.PlatformModule
      ),
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
