import { describe, it, expect, beforeEach, vi } from 'vitest';
import ModuloThreeFSM from '../ModuloThreeFSM';

describe('ModuloThreeFSM', () => {
  let moduloThree: ModuloThreeFSM;

  beforeEach(() => {
    moduloThree = new ModuloThreeFSM();
  });

  describe('validateBinary', () => {
    it('should return isValid: true for valid binary input', () => {
      const result = moduloThree.validateBinary('1010');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should return isValid: true for single digit binary numbers', () => {
      expect(moduloThree.validateBinary('0').isValid).toBe(true);
      expect(moduloThree.validateBinary('1').isValid).toBe(true);
    });

    it('should return isValid: false for empty input', () => {
      const result = moduloThree.validateBinary('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('Input cannot be empty');
    });

    it('should return isValid: false for null or undefined input', () => {
      // @ts-ignore - Testing invalid inputs
      const result1 = moduloThree.validateBinary(null);
      // @ts-ignore - Testing invalid inputs
      const result2 = moduloThree.validateBinary(undefined);

      expect(result1.isValid).toBe(false);
      expect(result1.error).toBe('Input cannot be empty');
      expect(result2.isValid).toBe(false);
      expect(result2.error).toBe('Input cannot be empty');
    });

    it('should return isValid: false for non-binary input', () => {
      const result = moduloThree.validateBinary('1012');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid symbol "2"');
    });

    it('should return isValid: false for inputs with letters', () => {
      const result = moduloThree.validateBinary('10a1');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid symbol "a"');
    });

    it('should return isValid: false for inputs with special characters', () => {
      const result = moduloThree.validateBinary('10-1');
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('Invalid symbol "-"');
    });
  });

  describe('getRemainder', () => {
    it('should return 0 for binary numbers that are divisible by 3', () => {
      expect(moduloThree.getRemainder('0')).toBe(0);    // 0 mod 3 = 0
      expect(moduloThree.getRemainder('11')).toBe(0);   // 3 mod 3 = 0
      expect(moduloThree.getRemainder('110')).toBe(0);  // 6 mod 3 = 0
      expect(moduloThree.getRemainder('1001')).toBe(0); // 9 mod 3 = 0
      expect(moduloThree.getRemainder('1100')).toBe(0); // 12 mod 3 = 0
    });

    it('should return 1 for binary numbers with remainder 1 when divided by 3', () => {
      expect(moduloThree.getRemainder('1')).toBe(1);     // 1 mod 3 = 1
      expect(moduloThree.getRemainder('100')).toBe(1);   // 4 mod 3 = 1
      expect(moduloThree.getRemainder('111')).toBe(1);   // 7 mod 3 = 1
      expect(moduloThree.getRemainder('1010')).toBe(1);  // 10 mod 3 = 1
      expect(moduloThree.getRemainder('10000')).toBe(1); // 16 mod 3 = 1
    });

    it('should return 2 for binary numbers with remainder 2 when divided by 3', () => {
      expect(moduloThree.getRemainder('10')).toBe(2);    // 2 mod 3 = 2
      expect(moduloThree.getRemainder('101')).toBe(2);   // 5 mod 3 = 2
      expect(moduloThree.getRemainder('1000')).toBe(2);  // 8 mod 3 = 2
      expect(moduloThree.getRemainder('1011')).toBe(2);  // 11 mod 3 = 2
      expect(moduloThree.getRemainder('1110')).toBe(2);  // 14 mod 3 = 2
    });

    it('should handle large binary numbers correctly', () => {
      expect(moduloThree.getRemainder('11111111')).toBe(0);      // 255 mod 3 = 0
      expect(moduloThree.getRemainder('100000000')).toBe(1);     // 256 mod 3 = 1
      expect(moduloThree.getRemainder('100000001')).toBe(2);     // 257 mod 3 = 2
      expect(moduloThree.getRemainder('1010101010101010')).toBe(1); // 43690 mod 3 = 1
    });

    it('should throw an error for invalid binary inputs', () => {
      // Test with invalid character 'a'
      try {
        moduloThree.getRemainder('1a0');
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        if (error instanceof Error) {
          expect(error.message).toContain('Invalid symbol "a"');
        }
      }

      // Test with invalid character '2'
      try {
        moduloThree.getRemainder('12');
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        if (error instanceof Error) {
          expect(error.message).toContain('Invalid symbol "2"');
        }
      }
    });

    it('should handle empty string by throwing an error from the validation', () => {
      try {
        moduloThree.getRemainder('');
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        // Expect an error to be thrown
        expect(error).toBeDefined();
        if (error instanceof Error) {
          expect(error.message).toBe('Input cannot be empty');
        }
      }
    });

    it('should throw a generic error if validation fails without a specific message', () => {
      // Create a test instance with a mocked validateBinary that returns isValid: false without an error message
      const testInstance = new ModuloThreeFSM();
      const originalValidateBinary = testInstance.validateBinary;
      
      // Mock the validateBinary method to return invalid without an error message
      testInstance.validateBinary = vi.fn().mockReturnValue({ isValid: false });
      
      try {
        // @ts-ignore - Access private method for testing
        testInstance.getRemainder('1010');
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        if (error instanceof Error) {
          expect(error.message).toBe('Invalid binary input');
        }
      } finally {
        // Restore the original method
        testInstance.validateBinary = originalValidateBinary;
      }
    });

    it('should throw an error for invalid state', () => {
      const testInstance = new ModuloThreeFSM();
      
      // @ts-ignore - Access and modify private property for testing
      const originalFsm = testInstance.fsm;
      
      try {
        // We need to mock both run and validateInput
        // @ts-ignore - Mock the fsm with necessary methods
        testInstance.fsm = {
          run: vi.fn().mockReturnValue('invalid_state'),
          validateInput: vi.fn().mockReturnValue({ isValid: true })
        };
        
        testInstance.getRemainder('1010');
        // If we reach this point, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        expect(error instanceof Error).toBe(true);
        if (error instanceof Error) {
          expect(error.message).toBe('Invalid state');
        }
      } finally {
        // Restore the original fsm
        // @ts-ignore - Access and modify private property for testing
        testInstance.fsm = originalFsm;
      }
    });
  });
}); 