/// <reference types="@testing-library/jest-dom" />
import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatically clean up after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
}); 