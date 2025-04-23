import React, { useRef, useEffect } from 'react';

interface BinaryInputProps {
  value: string;
  onChange: (value: string) => void;
  onCalculate: () => void;
  onClear?: () => void;
  autoFocus?: boolean;
}

const BinaryInput: React.FC<BinaryInputProps> = ({
  value,
  onChange,
  onCalculate,
  onClear,
  autoFocus = true
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCalculate();
    } else if (e.key === 'Escape') {
      onClear?.();
    }
  };

  return (
    <div className="binary-input-container">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Enter a binary number (e.g., 1010)"
        pattern="[01]*"
        aria-label="Binary number input"
      />
      <div className="button-group">
        <button 
          onClick={onCalculate}
          aria-label="Calculate Remainder"
          className="primary-button"
        >
          Calculate
        </button>
        {onClear && (
          <button 
            onClick={onClear}
            aria-label="Clear input and result"
            className="secondary-button"
            type="button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default BinaryInput; 