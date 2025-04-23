import TinyStateMachine from './TinyStateMachine';

/**
 * Modulo Three FSM - determines the remainder when a binary number is divided by 3
 * 
 * State transition logic:
 * - State r0: number mod 3 = 0
 * - State r1: number mod 3 = 1
 * - State r2: number mod 3 = 2
 */
export default class ModuloThreeFSM {
  private fsm: TinyStateMachine<'0' | '1', 'r0' | 'r1' | 'r2'>;

  constructor() {
    // Define the alphabet (binary digits)
    const alphabet = new Set(['0', '1'] as const);

    // Define state transitions
    // When in state r0 (mod 3 = 0):
    //   - Reading '0' keeps us in r0 (0*2 + 0 = 0 mod 3)
    //   - Reading '1' transitions to r1 (0*2 + 1 = 1 mod 3)
    // When in state r1 (mod 3 = 1):
    //   - Reading '0' transitions to r2 (1*2 + 0 = 2 mod 3)
    //   - Reading '1' transitions to r0 (1*2 + 1 = 3 mod 3 = 0)
    // When in state r2 (mod 3 = 2):
    //   - Reading '0' transitions to r1 (2*2 + 0 = 4 mod 3 = 1)
    //   - Reading '1' transitions to r2 (2*2 + 1 = 5 mod 3 = 2)
    const delta = {
      r0: { '0': 'r0', '1': 'r1' },
      r1: { '0': 'r2', '1': 'r0' },
      r2: { '0': 'r1', '1': 'r2' }
    } as const;

    // Create the FSM with initial state r0 (mod 3 = 0)
    this.fsm = new TinyStateMachine(delta, 'r0', alphabet as ReadonlySet<'0' | '1'>);
  }

  /**
   * Validates if the input is a valid binary number
   * @param binary The string to validate
   * @returns An object with isValid flag and optional error message
   */
  validateBinary(binary: string): { isValid: boolean; error?: string } {
    if (!binary || binary.trim() === '') {
      return { isValid: false, error: 'Input cannot be empty' };
    }

    // Use the FSM's validation method
    const validation = this.fsm.validateInput(binary);

    // Add additional binary-specific validation if needed
    if (!validation.isValid) {
      return validation;
    }

    return { isValid: true };
  }

  /**
   * Determine the remainder when a binary number is divided by 3
   * @param binary The binary number as a string of 0s and 1s
   * @returns The remainder (0, 1, or 2)
   * @throws Error if the input is invalid
   */
  getRemainder(binary: string): number {
    // Validate the input before processing
    const validation = this.validateBinary(binary);
    if (!validation.isValid) {
      throw new Error(validation.error || 'Invalid binary input');
    }

    const finalState = this.fsm.run(binary);

    // Map final state to remainder value
    switch (finalState) {
      case 'r0': return 0;
      case 'r1': return 1;
      case 'r2': return 2;
      default: throw new Error('Invalid state');
    }
  }
} 