import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'seeFit',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    // TODO: Add your local IP here
    url: 'localhost:8100',
    cleartext: true,
  },
};

export default config;
