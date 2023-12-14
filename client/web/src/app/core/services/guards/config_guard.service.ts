import { inject } from '@angular/core';

import { ConfigService } from '../config.service';

export const configGuard = async () => {
  const configService = inject(ConfigService);
  try {
    if (!configService.getConfigData()) {
      await configService.fetchConfigData();
    }
    return true;
  } catch (err) {
    console.log('Error', err);
    throw err;
  }
};
