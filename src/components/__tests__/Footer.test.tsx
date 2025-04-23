import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Footer from '../Footer';

describe('Footer', () => {
  it('renders with the provided GitHub username', () => {
    render(<Footer githubUsername="zeddotes" />);
    
    // Check if the GitHub username is rendered
    const link = screen.getByText('@zeddotes');
    expect(link).toBeInTheDocument();
  });
  
  it('has the correct GitHub URL', () => {
    render(<Footer githubUsername="zeddotes" />);
    
    // Check if the link has the correct href
    const link = screen.getByText('@zeddotes');
    expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/zeddotes');
  });
  
  it('has proper accessibility attributes', () => {
    render(<Footer githubUsername="zeddotes" />);
    
    // Check if the link has the correct aria-label
    const link = screen.getByText('@zeddotes').closest('a');
    expect(link).toHaveAttribute('aria-label', 'GitHub profile of zeddotes');
    
    // Check for target and rel attributes for security
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
  
  it('renders with a different username', () => {
    render(<Footer githubUsername="testuser" />);
    
    // Check if a different username renders correctly
    const link = screen.getByText('@testuser');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://github.com/testuser');
  });
}); 