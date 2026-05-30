import { X } from 'lucide-react';

type StatusBannerProps = {
  message: string | null;
  onDismiss: () => void;
};

export const StatusBanner = ({ message, onDismiss }: StatusBannerProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="status-banner" role="alert">
      <span>{message}</span>
      <button
        aria-label="Dismiss message"
        className="icon-button icon-button--ghost"
        onClick={onDismiss}
        title="Dismiss"
        type="button"
      >
        <X size={16} />
      </button>
    </div>
  );
};

