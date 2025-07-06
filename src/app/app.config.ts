import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes'; // Your main application routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // provideClientHydration() enables client-side hydration for SSR.
    // withEventReplay() enhances hydration by replaying events that occurred before hydration.
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()), // Provides HttpClient with fetch API for modern browsers
  ],
};
