import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

export const noAuthGuard = async () => {
  const authService = inject(AuthService);

  const router = inject(Router);
  try {
    console.log('LoginGuard');
    if (!authService.isAuthenticated()) {
      return true;
    }

    return router.parseUrl('/platform');
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
