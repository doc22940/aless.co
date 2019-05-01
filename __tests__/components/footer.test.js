import React from 'react';
import { render } from 'react-testing-library';
import Footer from '../../src/components/footer';

test('Footer', () => {
  const { getByText } = render(<Footer />);
  expect(getByText(/twitter/)).toHaveAttribute(
    'href',
    'https://twitter.com/alessbell'
  );
  expect(getByText(/github/)).toHaveAttribute(
    'href',
    'https://github.com/alessbell'
  );
  expect(getByText(/about/)).toHaveAttribute('href', '/about');
});