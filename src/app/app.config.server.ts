import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
// The imports for provideServerRendering and withRoutes are no longer needed here
// as the server-side rendering and routing are managed by the AngularAppEngine
// in src/server.ts and the definitions in src/app/app.routes.server.ts.

const serverConfig: ApplicationConfig = {
  providers: [
    // This array is intended for any *additional* providers that are specifically
    // required only when the application is running on the server.
    // For example, if you have services that should only be instantiated server-side,
    // you would add them here.
    // If there are no such specific server-only providers, this array can remain empty.
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
