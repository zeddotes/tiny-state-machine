# Binary Modulo 3 Calculator

A React application that uses a Finite State Machine (FSM) to calculate the remainder when a binary number is divided by 3.

## Node.js Version

This project requires Node.js version **v20.11.1** as specified in `.nvmrc` and `package.json`.

If you have [nvm](https://github.com/nvm-sh/nvm) installed, you can easily switch to the correct Node.js version by running:

```bash
nvm use
```

## Getting Started

1. Ensure you have the correct Node.js version (v20.11.1)
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to the local server URL (typically http://localhost:5173/)

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project for production
- `npm run preview`: Preview the production build locally
- `npm test`: Run tests with Vitest
- `npm run coverage`: Run tests with coverage reporting

## Features

- Validate binary number inputs
- Calculate the remainder when divided by 3 using a Finite State Machine
- Display the decimal equivalent of the binary input
- Modern React implementation with hooks
- Responsive design

## Implementation Details

The application uses a two-layer state machine approach:
1. `TinyStateMachine` - A generic FSM implementation
2. `ModuloThreeFSM` - A specific implementation that calculates modulo 3 of binary numbers

The FSM works by tracking the remainder as it processes each digit of the binary number from left to right.

## Author

Created by [@zeddotes](https://github.com/zeddotes) 