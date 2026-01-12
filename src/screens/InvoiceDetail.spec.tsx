import { render, screen } from '@testing-library/react-native';
import InvoiceDetail from './InvoiceDetail';
import { withSpecWrapper } from '../specs/wrapper';

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({ params: { id: 1 } }),
  useNavigation: () => ({ navigate: jest.fn(), goBack: jest.fn() }),
}));

jest.mock('../api/hooks', () => ({
  useInvoice: () => ({
    data: {
      id: 1,
      customer: { label: 'Test Customer', email: 'test@test.com' },
      date: '2024-01-01',
      finalized: false,
      paid: false,
      invoice_lines: [],
    },
    isLoading: false,
  }),
  useUpdateInvoice: () => ({ mutate: jest.fn() }),
  useDeleteInvoice: () => ({ mutate: jest.fn() }),
}));

describe('InvoiceDetail', () => {
  it('should render invoice details', () => {
    render(withSpecWrapper(<InvoiceDetail />));
    expect(screen.getByText(/Invoice #1/)).toBeTruthy();
    expect(screen.getByText(/Test Customer/)).toBeTruthy();
  });

  it('should render action buttons', () => {
    render(withSpecWrapper(<InvoiceDetail />));
    expect(screen.getByText('Edit')).toBeTruthy();
    expect(screen.getByText('Delete')).toBeTruthy();
    expect(screen.getByText('Finalize')).toBeTruthy();
  });
});