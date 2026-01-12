import { render, screen } from '@testing-library/react-native';
import Home from './Home';
import { withSpecWrapper } from '../specs/wrapper';

describe('Home', () => {
  it('should render create button', () => {
    render(withSpecWrapper(<Home />));
    expect(screen.getByText('Create a new one')).toBeTruthy();
  });

  it('should render search input', () => {
    render(withSpecWrapper(<Home />));
    expect(screen.getByPlaceholderText('Search invoices...')).toBeTruthy();
  });
});