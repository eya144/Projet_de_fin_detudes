import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dev.angular',
  appName: 'frontpfe',
  webDir: 'dist/frontpfe',
  bundledWebRuntime: false,
  server: {
    "hostname": "localhost",
    "androidScheme": "http",
    "iosScheme": "http"
  }
 
  
};

export default config;
