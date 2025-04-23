import { describe, it, expect } from 'vitest';
import TinyStateMachine from '../TinyStateMachine';

const validAlphabet = new Set(['a', 'b']);
const validDelta = {
  q0: {
    a: 'q1',
    b: 'q2',
  },
  q1: {
    a: 'q2',
    b: 'q2',
  },
  q2: {
    a: 'q2',
    b: 'q1',
  },
};
const validStart = 'q0';

describe('TinyStateMachine', () => {
  it('should be a class', () => {
    expect(TinyStateMachine).toBeInstanceOf(Function);
  });
  it('should have a constructor', () => {
    const machine = new TinyStateMachine(validDelta, validStart, validAlphabet);
    expect(machine).toBeInstanceOf(TinyStateMachine);
  });
  it('should throw an error if the alphabet is invalid', () => {
    const invalidAlphabet = new Set(['c', 'd']);
    expect(() => new TinyStateMachine(validDelta, validStart, invalidAlphabet)).toThrow();
    expect(() => new TinyStateMachine(validDelta, validStart, validAlphabet)).not.toThrow();
  });
  it('should throw an error if the delta is invalid', () => {
    const invalidDelta = {
      q0: {
        a: 'q1',
        b: 'q2',
      },
      q1: {
        a: 'q2',
      },
    };
    expect(() => new TinyStateMachine(invalidDelta, validStart, validAlphabet)).toThrow();
    expect(() => new TinyStateMachine(validDelta, validStart, validAlphabet)).not.toThrow();
  });
  it('should throw an error if the start is invalid', () => {
    const invalidStart = 'q3';
    expect(() => new TinyStateMachine(validDelta, invalidStart, validAlphabet)).toThrow();
    expect(() => new TinyStateMachine(validDelta, validStart, validAlphabet)).not.toThrow();
  });
  // TODO: add test for run method
  it('should run the machine', () => {
    const machine = new TinyStateMachine(validDelta, validStart, validAlphabet);
    expect(machine.run('ab')).toBe('q2');
  });
  it('should throw an error if the input is invalid', () => {
    const machine = new TinyStateMachine(validDelta, validStart, validAlphabet);
    expect(() => machine.run('ac')).toThrow();
  });

  // Tests for validateInput method
  describe('validateInput', () => {
    const machine = new TinyStateMachine(validDelta, validStart, validAlphabet);
    
    it('should return isValid: true for valid input', () => {
      const result = machine.validateInput('ab');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
    
    it('should return isValid: true for empty string', () => {
      const result = machine.validateInput('');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });
    
    it('should return isValid: false for invalid input', () => {
      const result = machine.validateInput('abc');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid symbol "c" at position 2');
    });
    
    it('should return isValid: false for input with invalid characters', () => {
      const result = machine.validateInput('a!b');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid symbol "!" at position 1');
    });
    
    it('should include valid symbols in error message', () => {
      const result = machine.validateInput('xyz');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Valid symbols are: a, b');
    });
  });
});