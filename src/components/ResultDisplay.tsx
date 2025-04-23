import React from 'react';

interface ResultDisplayProps {
  result: {
    message: string;
    color: string;
  };
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <p id="result" className="result-container" aria-live="polite">
      <span className="result-label">Remainder when divided by 3: </span>
      <span style={{ color: result.color }} className="result-value">{result.message}</span>
    </p>
  );
};

export default ResultDisplay; 