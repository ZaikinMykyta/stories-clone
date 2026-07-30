import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info.componentStack);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            const isQuotaError =
                this.state.error instanceof DOMException &&
                this.state.error.name === 'QuotaExceededError';

            return (
                <div className="flex min-h-dvh flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center">
                    <div className="max-w-md rounded-2xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
                        <span className="material-symbols-outlined mb-4 text-5xl text-pink-400">
                            error_outline
                        </span>
                        <h1 className="mb-2 text-xl font-semibold text-white">
                            Something went wrong
                        </h1>
                        <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                            {isQuotaError
                                ? 'Browser storage is full. Try removing old stories or using a smaller image.'
                                : 'An unexpected error occurred. You can try reloading the app.'}
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <button
                                type="button"
                                onClick={this.handleReset}
                                className="rounded-xl bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
                            >
                                Try again
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="rounded-xl bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                            >
                                Reload page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
