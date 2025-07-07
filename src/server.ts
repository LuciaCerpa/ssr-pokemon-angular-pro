import { AngularAppEngine, createRequestHandler } from '@angular/ssr';

import { getContext } from '@netlify/angular-runtime/context.mjs';

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
  const context = getContext();

  const result = await angularAppEngine.handle(request, context);

  return result || new Response('Not found', { status: 404 });
}

export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
