import { render, screen, fireEvent } from '@testing-library/react-native';
import Editor from './Editor';
import { withSpecWrapper } from '../specs/wrapper';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

jest.mock('../api/hooks', () => ({
  useCreateInvoice: () => ({ mutate: jest.fn() }),
}));

describe('Editor', () => {
  it('should render create invoice button', () => {
    render(withSpecWrapper(<Editor />));
    expect(screen.getByText('Create Invoice')).toBeTruthy();
  });

  it('should render add line button', () => {
    render(withSpecWrapper(<Editor />));
    expect(screen.getByText('Add Line')).toBeTruthy();
  });

  it('should render save buttons', () => {
    render(withSpecWrapper(<Editor />));
    expect(screen.getByText('Save as Draft')).toBeTruthy();
    expect(screen.getByText('Finalize Invoice')).toBeTruthy();
  });
});