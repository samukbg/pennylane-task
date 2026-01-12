import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, YStack, Text } from '../ui';
import { useInvoice, useUpdateInvoice, useDeleteInvoice } from '../api/hooks';

export default function InvoiceDetail() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  
  const { data: invoice, isLoading } = useInvoice(id);
  const updateMutation = useUpdateInvoice();
  const deleteMutation = useDeleteInvoice();

  if (isLoading) return <Text>Loading...</Text>;
  if (!invoice) return <Text>Invoice not found</Text>;

  const handleFinalize = () => {
    updateMutation.mutate({ id, data: { finalized: true } });
  };

  const handleTogglePaid = () => {
    updateMutation.mutate({ id, data: { paid: !invoice.paid } });
  };

  const handleDelete = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => navigation.goBack(),
    });
  };

  const handleEdit = () => {
    navigation.navigate('InvoiceEdit', { id });
  };

  return (
    <YStack>
      <Text>Invoice #{invoice.id}</Text>
      <Text>Customer: {invoice.customer?.first_name} {invoice.customer?.last_name}</Text>
      <Text>Date: {invoice.date}</Text>
      <Text>Status: {invoice.finalized ? 'Finalized' : 'Draft'}</Text>
      <Text>Paid: {invoice.paid ? 'Yes' : 'No'}</Text>
      
      {invoice.invoice_lines?.map((line, idx) => (
        <YStack key={idx}>
          <Text>{line.label} - {line.quantity} x {line.price}</Text>
        </YStack>
      ))}
      
      <Button onPress={handleEdit}>Edit</Button>
      {!invoice.finalized && <Button onPress={handleFinalize}>Finalize</Button>}
      <Button onPress={handleTogglePaid}>
        {invoice.paid ? 'Mark as Unpaid': 'Mark as Paid'}
      </Button>
      <Button onPress={handleDelete}>Delete</Button>
    </YStack>
  );
}