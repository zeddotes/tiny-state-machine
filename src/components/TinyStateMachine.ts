export default class TinyStateMachine<A extends string, S extends string> {
  #state: S;
  #delta: Record<S, Record<A, S>>;
  #alphabet: ReadonlySet<A>;
  
  constructor(
    delta: Record<S, Record<A, S>>,
    private readonly start: S,
    alphabet: ReadonlySet<A>
  ) {
    this.#state = start;
    this.#delta = delta;
    this.#alphabet = alphabet;
    
    if (!this.#delta[start])
      throw new Error(`Invalid start state "${start}"`);

    // validate alphabet
    for (const symbol of this.#alphabet) {
      if (!this.#delta[this.start][symbol])
        throw new Error(`Invalid symbol "${symbol}"`);
    }

    // validate delta -- every state should have a transition for every symbol in the alphabet
    for (const state in this.#delta) {
      for (const symbol of this.#alphabet) {
        if (!this.#delta[state][symbol])
          throw new Error(`Missing transition for state "${state}" and symbol "${symbol}"`);
      }
    }
  }

  /**
   * Validates if the input string contains only valid symbols from the alphabet
   * @param input The string to validate
   * @returns An object with isValid flag and optional error message
   */
  validateInput(input: string): { isValid: boolean; error?: string } {
    for (let i = 0; i < input.length; i++) {
      const ch = input[i];
      if (!this.#alphabet.has(ch as A)) {
        return { 
          isValid: false, 
          error: `Invalid symbol "${ch}" at position ${i}. Valid symbols are: ${[...this.#alphabet].join(', ')}`
        };
      }
    }
    return { isValid: true };
  }

  run(input: string): S {
    this.#state = this.start;
    for (const ch of input) {
      if (!this.#alphabet.has(ch as A))
        throw new Error(`Invalid symbol "${ch}"`);
      this.#state = this.#delta[this.#state][ch as A];
    }
    return this.#state;
  }
}