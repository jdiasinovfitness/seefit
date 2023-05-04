import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'activity',
        loadChildren: () =>
          import('./activity/activity.module').then((m) => m.ActivityModule),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer-routing.module').then(
            (m) => m.CustomerRoutingModule
          ),
      },
      {
        path: 'notification',
        loadChildren: () =>
          import('./notifications/notifications-routing.module').then(
            (m) => m.NotificationsRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
