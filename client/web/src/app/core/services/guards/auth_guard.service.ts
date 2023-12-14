import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ConfigService } from '../config.service';

export const authGuard = async () => {
  const authService = inject(AuthService);
  const configService = inject(ConfigService);
  const router = inject(Router);
  try {
    if (authService.isAuthenticated()) {
      if (configService.getConfigData().length === 0) {
        await configService.fetchConfigData();
      }
      return true;
    }
    return router.parseUrl('/auth');
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
