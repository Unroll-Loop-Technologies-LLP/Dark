import { Component, type ErrorInfo, type ReactNode } from "react";
import { redirectToErrorPage } from "../lib/error-redirect";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled render error:", error, errorInfo);
    this.setState({ hasError: true });
    redirectToErrorPage(500);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-[#0B0F1A] text-white px-6 text-center">
            <div>
              <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
              <p className="text-gray-400">
                We&apos;re redirecting you to our error page. If you are not redirected automatically, please refresh the page.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
