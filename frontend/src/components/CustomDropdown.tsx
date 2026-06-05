import { FocusEvent, useId, useMemo, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export type CustomDropdownOption = {
  label: string;
  value: string;
};

type CustomDropdownProps = {
  disabled?: boolean;
  label: string;
  onChange: (value: string) => void;
  options: CustomDropdownOption[];
  placeholder?: string;
  value: string;
};

export const CustomDropdown = ({
  disabled = false,
  label,
  onChange,
  options,
  placeholder = 'Select an option',
  value
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const labelId = useId();
  const buttonId = useId();
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) || null,
    [options, value]
  );

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextFocusedElement = event.relatedTarget as Node | null;

    if (!event.currentTarget.contains(nextFocusedElement)) {
      setIsOpen(false);
    }
  };

  return (
    <div className="custom-dropdown-field">
      <span className="custom-dropdown-label" id={labelId}>
        {label}
      </span>

      <div className="custom-dropdown" onBlur={handleBlur}>
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={`${labelId} ${buttonId}`}
          className="custom-dropdown-trigger"
          disabled={disabled}
          id={buttonId}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span>{selectedOption?.label || placeholder}</span>
          <ChevronDown aria-hidden="true" size={17} />
        </button>

        {isOpen ? (
          <div
            aria-labelledby={labelId}
            className="custom-dropdown-menu"
            role="listbox"
          >
            {options.map((option) => (
              <button
                aria-selected={option.value === value}
                className="custom-dropdown-option"
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                role="option"
                type="button"
              >
                <span>{option.label}</span>
                {option.value === value ? <Check size={16} /> : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};
