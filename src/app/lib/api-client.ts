import { redirectToErrorPage, shouldRedirectError } from "./error-redirect";

export async function safeFetchJson<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const status = response.status;

    if (shouldRedirectError(status)) {
      redirectToErrorPage(status);
      throw new Error(`Redirecting to error page with status ${status}`);
    }

    const bodyText = await response.text().catch(() => "");
    throw new Error(bodyText || `Request failed with status ${status}`);
  }

  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json() as Promise<T>;
  }

  return (await response.text()) as unknown as T;
}

/**
 * Fetch JSON with structured error handling.
 * - Returns 4xx responses as error objects (recoverable, stay on form)
 * - Redirects on 5xx errors (fatal, go to error page)
 * - Type-safe for both success and error responses
 */
export async function fetchJsonWithStructuredError<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T | { error: string; status: number }> {
  const response = await fetch(input, init);

  if (response.ok) {
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  }

  const status = response.status;
  const contentType = response.headers.get("Content-Type") || "";

  // Recoverable 4xx errors: Return to caller for inline error display
  if (status >= 400 && status < 500) {
    if (contentType.includes("application/json")) {
      const errorData = await response.json().catch(() => ({ error: "Request failed" }));
      return {
        error: errorData?.error || `Request failed with status ${status}`,
        status,
      };
    }

    const bodyText = await response.text().catch(() => "");
    return {
      error: bodyText || `Request failed with status ${status}`,
      status,
    };
  }

  // Fatal 5xx errors: Redirect to error page
  if (status >= 500) {
    redirectToErrorPage(status);
    throw new Error(`Redirecting to error page with status ${status}`);
  }

  // Fallback for other statuses
  throw new Error(`Request failed with status ${status}`);
}

