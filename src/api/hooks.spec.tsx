import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInvoices, useCreateInvoice, useDeleteInvoice } from './hooks';
import { ApiProvider } from './index';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <ApiProvider url="https://jean-test-api.herokuapp.com/" token="test">
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ApiProvider>
  );
};

describe('useInvoices', () => {
  it('should fetch invoices', async () => {
    const { result } = renderHook(() => useInvoices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});

describe('useCreateInvoice', () => {
  it('should create invoice', async () => {
    const { result } = renderHook(() => useCreateInvoice(), {
      wrapper: createWrapper(),
    });

    expect(result.current.mutate).toBeDefined();
  });
});