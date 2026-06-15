export const ERROR_PAGE_BASE = "https://error.unrollloop.com/?code=";

export const HANDLED_ERROR_CODES = new Set([
  400,
  401,
  403,
  404,
  405,
  408,
  409,
  422,
  429,
  500,
  501,
  502,
  503,
  504,
]);

export function normalizeErrorCode(value: unknown): number {
  if (typeof value === "number" && Number.isInteger(value) && HANDLED_ERROR_CODES.has(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isInteger(parsed) && HANDLED_ERROR_CODES.has(parsed)) {
      return parsed;
    }
  }

  return 500;
}

export function redirectToErrorPage(errorCode?: unknown): void {
  if (typeof window === "undefined") {
    return;
  }

  const statusCode = normalizeErrorCode(errorCode);
  const destination = `${ERROR_PAGE_BASE}${statusCode}`;

  if (window.location.href === destination) {
    return;
  }

  window.location.replace(destination);
}

export function shouldRedirectError(code: number): boolean {
  return HANDLED_ERROR_CODES.has(code);
}
