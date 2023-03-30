import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { PlatformComponent } from './platform.component';

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    canActivateChild: [AuthGuard],

    children: [
      {
        path: 'user_profile/:id',
        loadChildren: () =>
          import('./user-profile/user-profile.module').then(
            m => m.UserProfileModule
          ),
      },
      {
        path: 'interaction',
        loadChildren: () =>
          import('./interaction/interaction.module').then(
            m => m.InteractionModule
          ),
      },
      //health&nutrition
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatformRoutingModule {}
