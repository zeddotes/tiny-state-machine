import React, { createContext, useState, useCallback, useContext, ReactNode } from 'react';
import ModuloThreeFSM from '../components/ModuloThreeFSM';

// Create an instance of our ModuloThreeFSM
const moduloThree = new ModuloThreeFSM();

// Define the shape of our context
interface ModuloCalculatorContextType {
  binaryValue: string;
  result: {
    message: string;
    color: string;
  };
  handleBinaryValueChange: (value: string) => void;
  calculateRemainder: () => void;
  clearCalculation: () => void;
}

// Create the context with a default value
const ModuloCalculatorContext = createContext<ModuloCalculatorContextType | undefined>(undefined);

// Provider component
interface ModuloCalculatorProviderProps {
  children: ReactNode;
}

export const ModuloCalculatorProvider: React.FC<ModuloCalculatorProviderProps> = ({ children }) => {
  const [binaryValue, setBinaryValue] = useState<string>('');
  const [result, setResult] = useState<{ message: string; color: string }>({
    message: '-',
    color: 'inherit'
  });

  // Calculate remainder using FSM
  const calculateRemainder = useCallback(() => {
    // Use the FSM's validation method
    const validation = moduloThree.validateBinary(binaryValue);
    
    if (!validation.isValid) {
      setResult({
        message: validation.error || 'Invalid input!',
        color: 'red'
      });
      return;
    }
    
    try {
      // Calculate remainder using our FSM
      const remainder = moduloThree.getRemainder(binaryValue);
      
      // Calculate the decimal value for reference
      const decimalValue = parseInt(binaryValue, 2);
      
      // Format the output message
      const message = `${remainder} (${binaryValue} = ${decimalValue} in decimal)`;
      
      setResult({
        message,
        color: 'green'
      });
    } catch (error) {
      setResult({
        message: `Error: ${error instanceof Error ? error.message : String(error)}`,
        color: 'red'
      });
    }
  }, [binaryValue]);

  // Handle input change
  const handleBinaryValueChange = useCallback((value: string) => {
    setBinaryValue(value);
  }, []);

  // Clear calculation
  const clearCalculation = useCallback(() => {
    setBinaryValue('');
    setResult({
      message: '-',
      color: 'inherit'
    });
  }, []);

  return (
    <ModuloCalculatorContext.Provider value={{
      binaryValue,
      result,
      handleBinaryValueChange,
      calculateRemainder,
      clearCalculation
    }}>
      {children}
    </ModuloCalculatorContext.Provider>
  );
};

// Custom hook to use the calculator context
export const useModuloCalculator = (): ModuloCalculatorContextType => {
  const context = useContext(ModuloCalculatorContext);
  
  if (context === undefined) {
    throw new Error('useModuloCalculator must be used within a ModuloCalculatorProvider');
  }
  
  return context;
}; 