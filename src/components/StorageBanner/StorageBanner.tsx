interface StorageBannerProps {
    message: string;
    onDismiss: () => void;
}

const StorageBanner = ({ message, onDismiss }: StorageBannerProps) => (
    <div
        role="alert"
        className="mx-auto mb-4 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100"
    >
        <span className="material-symbols-outlined shrink-0 text-lg text-amber-400">
            warning
        </span>
        <p className="flex-1 leading-relaxed">{message}</p>
        <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 rounded-lg p-1 text-amber-300/70 transition-colors hover:bg-amber-500/20 hover:text-amber-200"
            aria-label="Dismiss warning"
        >
            <span className="material-symbols-outlined text-lg">close</span>
        </button>
    </div>
);

export default StorageBanner;
