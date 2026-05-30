import type { ButtonHTMLAttributes, ReactNode } from 'react';

type LoadingButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
  loadingLabel?: string;
  children: ReactNode;
};

export const ButtonSpinner = () => (
  <span className="button-spinner" aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

export const LoadingButton = ({
  children,
  disabled,
  isLoading = false,
  loadingLabel = 'Loading',
  type = 'button',
  ...props
}: LoadingButtonProps) => (
  <button
    {...props}
    aria-busy={isLoading}
    disabled={disabled || isLoading}
    type={type}
  >
    {isLoading ? (
      <>
        <ButtonSpinner />
        {loadingLabel}
      </>
    ) : (
      children
    )}
  </button>
);

