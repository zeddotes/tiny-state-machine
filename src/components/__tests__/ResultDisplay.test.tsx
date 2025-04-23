import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ResultDisplay from '../ResultDisplay';

describe('ResultDisplay', () => {
  it('renders with default values', () => {
    render(
      <ResultDisplay result={{ message: '-', color: 'inherit' }} />
    );
    
    // Check if the label is rendered
    expect(screen.getByText('Remainder when divided by 3:')).toBeInTheDocument();
    
    // Check if the result message is rendered
    expect(screen.getByText('-')).toBeInTheDocument();
  });
  
  it('renders with success result', () => {
    const result = {
      message: '0 (1100 = 12 in decimal)',
      color: 'green'
    };
    
    render(<ResultDisplay result={result} />);
    
    // Check if the success message is rendered
    expect(screen.getByText('0 (1100 = 12 in decimal)')).toBeInTheDocument();
    
    // Check if the color style is applied (without checking the exact color value)
    const resultValue = screen.getByText('0 (1100 = 12 in decimal)');
    expect(resultValue.style.color).toBeTruthy();
  });
  
  it('renders with error result', () => {
    const result = {
      message: 'Error: Invalid input!',
      color: 'red'
    };
    
    render(<ResultDisplay result={result} />);
    
    // Check if the error message is rendered
    expect(screen.getByText('Error: Invalid input!')).toBeInTheDocument();
    
    // Check if the color style is applied (without checking the exact color value)
    const resultValue = screen.getByText('Error: Invalid input!');
    expect(resultValue.style.color).toBeTruthy();
  });
  
  it('has proper accessibility attributes', () => {
    render(
      <ResultDisplay result={{ message: '-', color: 'inherit' }} />
    );
    
    // Check if aria-live attribute is present
    const resultContainer = screen.getByText(/Remainder when divided by 3/).closest('p');
    expect(resultContainer).toHaveAttribute('aria-live', 'polite');
  });
}); 