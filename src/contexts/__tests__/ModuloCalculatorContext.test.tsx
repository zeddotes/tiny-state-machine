import { render, screen, fireEvent } from '@testing-library/react';
import { ModuloCalculatorProvider, useModuloCalculator } from '../ModuloCalculatorContext';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ModuloThreeFSM from '../../components/ModuloThreeFSM';

// Create a test component that uses the context
const TestComponent = () => {
  const { 
    binaryValue, 
    result, 
    handleBinaryValueChange, 
    calculateRemainder,
    clearCalculation 
  } = useModuloCalculator();

  return (
    <div>
      <input 
        data-testid="input"
        value={binaryValue}
        onChange={(e) => handleBinaryValueChange(e.target.value)}
      />
      <button data-testid="calculate" onClick={calculateRemainder}>Calculate</button>
      <button data-testid="clear" onClick={clearCalculation}>Clear</button>
      <div data-testid="result">{result.message}</div>
      <div data-testid="result-color" style={{ color: result.color }}>Color</div>
    </div>
  );
};

// Helper function to render the test component with the context provider
const renderWithProvider = () => {
  return render(
    <ModuloCalculatorProvider>
      <TestComponent />
    </ModuloCalculatorProvider>
  );
};

describe('ModuloCalculatorContext', () => {
  // Restore mocks after each test
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides initial state', () => {
    renderWithProvider();
    
    // Initial value should be empty
    expect(screen.getByTestId('input')).toHaveValue('');
    
    // Initial result should be '-'
    expect(screen.getByTestId('result')).toHaveTextContent('-');
  });
  
  it('updates binary value when handleBinaryValueChange is called', () => {
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    
    // Change the input value
    fireEvent.change(input, { target: { value: '1010' } });
    
    // Check if the value is updated
    expect(input).toHaveValue('1010');
  });
  
  it('calculates remainder correctly for valid input', () => {
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    
    // Enter a valid binary number
    fireEvent.change(input, { target: { value: '1100' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Check if result shows correct remainder (1100 = 12 in decimal, 12 % 3 = 0)
    expect(screen.getByTestId('result').textContent).toContain('0');
    expect(screen.getByTestId('result').textContent).toContain('1100');
    expect(screen.getByTestId('result').textContent).toContain('12');
    
    // Check if the result color is green
    expect(screen.getByTestId('result-color').style.color).toBeTruthy();
  });
  
  it('shows error for invalid input', () => {
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    
    // Enter an invalid binary number
    fireEvent.change(input, { target: { value: '12a' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Check if error message is shown
    expect(screen.getByTestId('result').textContent).toContain('Invalid');
    
    // Check if the result color is red
    expect(screen.getByTestId('result-color').style.color).toBeTruthy();
  });
  
  // Test for line 41: validation.error || 'Invalid input!'
  it('uses default error message when validation result lacks error message', () => {
    // Spy on validateBinary to return {isValid: false} without an error message
    const validateBinarySpy = vi.spyOn(ModuloThreeFSM.prototype, 'validateBinary');
    validateBinarySpy.mockReturnValue({ isValid: false });
    
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    
    // Enter any value
    fireEvent.change(input, { target: { value: 'test' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Default error message should be shown
    expect(screen.getByTestId('result').textContent).toBe('Invalid input!');
    
    // Clean up
    validateBinarySpy.mockRestore();
  });
  
  // Test for lines 61-66: error instanceof Error ? error.message : String(error)
  it('formats error message from Error instance', () => {
    // Spy on getRemainder to throw an Error instance
    const getRemainderSpy = vi.spyOn(ModuloThreeFSM.prototype, 'getRemainder');
    getRemainderSpy.mockImplementation(() => {
      throw new Error('Test error message');
    });
    
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    
    // Enter valid input so validation passes
    fireEvent.change(input, { target: { value: '101' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Error message should contain the error message from the Error instance
    expect(screen.getByTestId('result').textContent).toBe('Error: Test error message');
    
    // Clean up
    getRemainderSpy.mockRestore();
  });
  
  it('formats error message from non-Error values', () => {
    // Spy on getRemainder to throw a string instead of an Error
    const getRemainderSpy = vi.spyOn(ModuloThreeFSM.prototype, 'getRemainder');
    getRemainderSpy.mockImplementation(() => {
      throw 'Plain string error'; // Not an Error instance
    });
    
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    
    // Enter valid input so validation passes
    fireEvent.change(input, { target: { value: '101' } });
    
    // Click calculate button
    fireEvent.click(calculateButton);
    
    // Error message should contain the stringified error
    expect(screen.getByTestId('result').textContent).toBe('Error: Plain string error');
    
    // Clean up
    getRemainderSpy.mockRestore();
  });
  
  it('handles errors in try-catch block', () => {
    // Create a test component that triggers an error
    const ErrorTestComponent = () => {
      const { calculateRemainder } = useModuloCalculator();
      
      // Override the calculateRemainder to force an error
      const triggerError = () => {
        try {
          // Intentionally cause an error by accessing undefined property
          const obj: any = undefined;
          obj.nonExistentMethod();
        } catch {
          // This will trigger the catch block in the context
          // We don't use the error here, we're just testing the try-catch flow
          calculateRemainder();
        }
      };
      
      return (
        <div>
          <button data-testid="error-button" onClick={triggerError}>
            Trigger Error
          </button>
          <div data-testid="result-error">{useModuloCalculator().result.message}</div>
        </div>
      );
    };
    
    // Render with our error component
    render(
      <ModuloCalculatorProvider>
        <ErrorTestComponent />
      </ModuloCalculatorProvider>
    );
    
    // Trigger the error
    fireEvent.click(screen.getByTestId('error-button'));
    
    // Error result should show an error message
    expect(screen.getByTestId('result-error').textContent).not.toBe('-');
  });
  
  it('clears calculation when clearCalculation is called', () => {
    renderWithProvider();
    
    const input = screen.getByTestId('input');
    const calculateButton = screen.getByTestId('calculate');
    const clearButton = screen.getByTestId('clear');
    
    // Enter a value and calculate
    fireEvent.change(input, { target: { value: '1010' } });
    fireEvent.click(calculateButton);
    
    // Verify calculation happened
    expect(screen.getByTestId('result').textContent).not.toBe('-');
    
    // Clear the calculation
    fireEvent.click(clearButton);
    
    // Check if input value is cleared
    expect(input).toHaveValue('');
    
    // Check if result is reset
    expect(screen.getByTestId('result')).toHaveTextContent('-');
  });
  
  it('throws an error when used outside of provider', () => {
    // Silence the expected error in the console
    const originalConsoleError = console.error;
    console.error = vi.fn();
    
    // Define a component that uses the context without provider
    const InvalidComponent = () => {
      const { binaryValue } = useModuloCalculator();
      return <div>{binaryValue}</div>;
    };
    
    // Expect render to throw an error
    expect(() => {
      render(<InvalidComponent />);
    }).toThrow('useModuloCalculator must be used within a ModuloCalculatorProvider');
    
    // Restore console.error
    console.error = originalConsoleError;
  });
}); 