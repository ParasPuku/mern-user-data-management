import { CheckCircle2, X, XCircle } from 'lucide-react';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  removeToast,
  selectToasts
} from '../features/notifications/notificationsSlice';

const TOAST_DURATION_MS = 4500;

export const ToastViewport = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  useEffect(() => {
    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        dispatch(removeToast(toast.id));
      }, TOAST_DURATION_MS)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, [dispatch, toasts]);

  return (
    <div className="toast-viewport" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className={`toast toast--${toast.type}`} key={toast.id}>
          {toast.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <XCircle size={18} />
          )}
          <span>{toast.message}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => dispatch(removeToast(toast.id))}
            title="Dismiss"
            type="button"
          >
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  );
};

