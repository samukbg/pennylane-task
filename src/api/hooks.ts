import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useApi } from './index';

export function useInvoices(params?: { page?: number; per_page?: number; filter?: string }) {
  const api = useApi();
  return useQuery({
    queryKey: ['invoices', params],
    queryFn: async () => {
      const response = await api.getInvoices(params);
      return response.data;
    },
  });
}

export function useInvoice(id: number) {
  const api = useApi();
  return useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      const response = await api.getInvoice(id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateInvoice() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.postInvoices(null, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}

export function useUpdateInvoice() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const response = await api.putInvoice(id, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice', variables.id] });
    },
  });
}

export function useDeleteInvoice() {
  const api = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await api.deleteInvoice(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}

export function useCustomers(search?: string) {
  const api = useApi();
  return useQuery({
    queryKey: ['customers', search],
    queryFn: async () => {
      const response = await api.getSearchCustomers({ query: search || '' });
      return response.data;
    },
    enabled: !!search && search.length > 0,
  });
}

export function useProducts(search?: string) {
  const api = useApi();
  return useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      const response = await api.getSearchProducts({ query: search || '' });
      return response.data;
    },
    enabled: !!search && search.length > 0,
  });
}