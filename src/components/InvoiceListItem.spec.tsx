import { render, screen } from '@testing-library/react-native';
import InvoiceListItem from './InvoiceListItem';
import { withSpecWrapper } from '../specs/wrapper';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

describe('InvoiceListItem', () => {
  const mockInvoice = {
    id: 1,
    customer: { label: 'Test Customer' },
    finalized: false,
  };

  it('should render invoice info', () => {
    render(withSpecWrapper(<InvoiceListItem invoice={mockInvoice} />));
    expect(screen.getByText(/#1 - Test Customer/)).toBeTruthy();
    expect(screen.getByText('Draft')).toBeTruthy();
  });
});