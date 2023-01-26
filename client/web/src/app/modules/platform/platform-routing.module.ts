import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from 'src/app/core/guards/auth-guard.guard';
import { PlatformComponent } from './platform.component';

const routes: Routes = [
	{
		path: '',
		component: PlatformComponent,
		canActivateChild: [AuthGuardGuard],

		children: [
			{
				path: 'user_profile/:id',
				loadChildren: () =>
					import('./user-profile/user-profile.module').then(
						m => m.UserProfileModule
					),
				//interactions
				//health&nutrition
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PlatformRoutingModule {}
