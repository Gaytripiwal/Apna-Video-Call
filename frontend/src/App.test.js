// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Jest test to check if the "Learn React" text is rendered in the App component
test('renders learn react link', () => {
  render(<App />); // Render the App component
  const linkElement = screen.getByText(/learn react/i); // Search for text "learn react" (case insensitive)
  expect(linkElement).toBeInTheDocument(); // Check if the element is present in the DOM
});
