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
