// Import necessary modules from @angular/ssr for server-side rendering.
// AngularAppEngine is the core class for handling Angular application rendering on the server.
// createRequestHandler is used to create a function that can handle HTTP requests.
import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

// Import getContext from the Netlify Angular runtime.
// This function provides access to the Netlify serverless function context,
// which can include environment variables, client context, etc.
import { getContext } from '@netlify/angular-runtime/context.mjs';

// Create an instance of the AngularAppEngine.
// This instance will be used to process incoming requests and render
// the Angular application on the server.
const angularAppEngine = new AngularAppEngine();

/**
 * Asynchronously handles incoming HTTP requests for the Netlify App Engine.
 * This function acts as an adapter between the Netlify serverless environment
 * and the AngularAppEngine.
 *
 * @param request The incoming Request object, representing the HTTP request.
 * @returns A Promise that resolves to a Response object, which will be sent back to the client.
 */
export async function netlifyAppEngineHandler(
  request: Request
): Promise<Response> {
  // Retrieve the Netlify context for the current request.
  const context = getContext();

  // Use the AngularAppEngine to handle the request.
  // The 'handle' method processes the request, performs server-side rendering,
  // and returns a Response object (e.g., HTML content, redirects).
  const result = await angularAppEngine.handle(request, context);

  // Return the result from the AngularAppEngine.
  // If the engine does not produce a result (e.g., no matching route),
  // return a 404 Not Found response as a fallback.
  return result || new Response('Not found', { status: 404 });
}

/**
 * Creates a request handler function using the 'netlifyAppEngineHandler'.
 * This 'reqHandler' is the primary export that Netlify (or other server environments)
 * will use to invoke your Angular SSR application.
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
