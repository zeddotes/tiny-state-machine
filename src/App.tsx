import BinaryInput from './components/BinaryInput';
import Footer from './components/Footer';
import ResultDisplay from './components/ResultDisplay';
import { useModuloCalculator } from './contexts/ModuloCalculatorContext';

function App() {
  const {
    binaryValue,
    result,
    handleBinaryValueChange,
    calculateRemainder,
    clearCalculation
  } = useModuloCalculator();

  return (
    <div className="app-container">
      {/* Skip to content link for accessibility */}
      <a href="#calculator" className="skip-to-content">
        Skip to calculator
      </a>
      
      <main>
        <header>
          <h1>Binary Modulo 3 Calculator</h1>
        </header>
        
        <div id="calculator" className="card" role="region" aria-label="Binary modulo calculator">
          <BinaryInput
            value={binaryValue}
            onChange={handleBinaryValueChange}
            onCalculate={calculateRemainder}
            onClear={clearCalculation}
          />
          <ResultDisplay result={result} />
        </div>
        
        <p className="read-the-docs">
          Enter a binary number (consisting of only 0s and 1s) and see the remainder when divided by 3
        </p>
      </main>
      
      <Footer githubUsername="zeddotes" />
    </div>
  );
}

export default App; 