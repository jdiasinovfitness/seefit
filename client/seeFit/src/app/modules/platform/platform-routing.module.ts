import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformComponent } from './platform.component';

const routes: Routes = [
  {
    path: '',
    component: PlatformComponent,
    children: [
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'interaction',
        loadChildren: () =>
          import('./interaction/interaction.module').then(
            (m) => m.InteractionModule
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
