import { render, screen } from '@testing-library/react';
import SocialApp from "./App";

test('renders without crashing', () => {
  render(<SocialApp />);
  const main = screen.getByRole(/main/i)
  expect(main).toBeInTheDocument();
});


