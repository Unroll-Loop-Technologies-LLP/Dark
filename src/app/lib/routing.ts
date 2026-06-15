/**
 * URL-based routing utilities for legal documents and main pages
 * Supports hash-based routing (#/privacy, #/terms, #/cookies)
 */

export type LegalRoute = "privacy" | "terms" | "cookies";
export type AppRoute = "home" | LegalRoute;

export function getCurrentRoute(): AppRoute | null {
  if (typeof window === "undefined") return null;

  const hash = window.location.hash.slice(1); // Remove #
  const route = hash.startsWith("/") ? hash.slice(1) : null;

  if (route === "privacy" || route === "terms" || route === "cookies") {
    return route;
  }

  return null;
}

export function navigateTo(route: AppRoute | string): void {
  if (typeof window === "undefined") return;

  if (route === "home") {
    window.location.hash = "";
  } else {
    window.location.hash = `#/${route}`;
  }
}

export function isLegalRoute(route: string | null): route is LegalRoute {
  return route === "privacy" || route === "terms" || route === "cookies";
}

export function useRouteListener(callback: (route: AppRoute | null) => void): void {
  if (typeof window === "undefined") return;

  const handleHashChange = () => {
    callback(getCurrentRoute());
  };

  window.addEventListener("hashchange", handleHashChange);

  // Call immediately on mount
  callback(getCurrentRoute());

  return () => {
    window.removeEventListener("hashchange", handleHashChange);
  };
}
