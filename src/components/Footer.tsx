import React from 'react';

interface FooterProps {
  githubUsername: string;
}

const Footer: React.FC<FooterProps> = ({ githubUsername }) => {
  return (
    <footer className="footer">
      <p>
        Created by <a 
          href={`https://github.com/${githubUsername}`} 
          target="_blank" 
          rel="noreferrer"
          aria-label={`GitHub profile of ${githubUsername}`}
        >
          @{githubUsername}
        </a>
      </p>
    </footer>
  );
};

export default Footer; 