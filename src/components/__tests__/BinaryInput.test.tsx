import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BinaryInput from '../BinaryInput';

describe('BinaryInput', () => {
  it('renders with initial value', () => {
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={vi.fn()}
      />
    );
    
    // Check if the input has the correct value
    const input = screen.getByLabelText('Binary number input') as HTMLInputElement;
    expect(input.value).toBe('1010');
  });
  
  it('calls onChange when input value changes', () => {
    const mockOnChange = vi.fn();
    
    render(
      <BinaryInput
        value=""
        onChange={mockOnChange}
        onCalculate={vi.fn()}
      />
    );
    
    // Simulate input change
    const input = screen.getByLabelText('Binary number input');
    fireEvent.change(input, { target: { value: '1010' } });
    
    // Check if onChange was called with the new value
    expect(mockOnChange).toHaveBeenCalledWith('1010');
  });
  
  it('calls onCalculate when Calculate button is clicked', () => {
    const mockOnCalculate = vi.fn();
    
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={mockOnCalculate}
      />
    );
    
    // Simulate button click
    const button = screen.getByText('Calculate');
    fireEvent.click(button);
    
    // Check if onCalculate was called
    expect(mockOnCalculate).toHaveBeenCalledTimes(1);
  });
  
  it('calls onCalculate when Enter key is pressed', () => {
    const mockOnCalculate = vi.fn();
    
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={mockOnCalculate}
      />
    );
    
    // Simulate Enter key press
    const input = screen.getByLabelText('Binary number input');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    // Check if onCalculate was called
    expect(mockOnCalculate).toHaveBeenCalledTimes(1);
  });
  
  it('calls onClear when Clear button is clicked', () => {
    const mockOnClear = vi.fn();
    
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={vi.fn()}
        onClear={mockOnClear}
      />
    );
    
    // Simulate button click
    const button = screen.getByText('Clear');
    fireEvent.click(button);
    
    // Check if onClear was called
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
  
  it('calls onClear when Escape key is pressed', () => {
    const mockOnClear = vi.fn();
    
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={vi.fn()}
        onClear={mockOnClear}
      />
    );
    
    // Simulate Escape key press
    const input = screen.getByLabelText('Binary number input');
    fireEvent.keyDown(input, { key: 'Escape' });
    
    // Check if onClear was called
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
  
  it('does not render Clear button when onClear is not provided', () => {
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={vi.fn()}
      />
    );
    
    // Check that Clear button is not rendered
    expect(screen.queryByText('Clear')).toBeNull();
  });
  
  it('has proper accessibility attributes', () => {
    render(
      <BinaryInput
        value="1010"
        onChange={vi.fn()}
        onCalculate={vi.fn()}
      />
    );
    
    // Check input accessibility
    const input = screen.getByLabelText('Binary number input');
    expect(input).toHaveAttribute('aria-label', 'Binary number input');
    
    // Check button accessibility
    const button = screen.getByText('Calculate');
    expect(button).toHaveAttribute('aria-label', 'Calculate Remainder');
  });
}); 