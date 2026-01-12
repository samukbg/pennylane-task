import { useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, InvoiceDetailScreenRouteProp } from '../navigation';
import { Button, YStack, Text } from '../ui';
import { useInvoice, useUpdateInvoice, useDeleteInvoice } from '../api/hooks';
import { Alert } from 'react-native';

export default function InvoiceDetail() {
  const route = useRoute<InvoiceDetailScreenRouteProp>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { id } = route.params;
  
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
    Alert.alert('Delete Invoice', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          deleteMutation.mutate(id, {
            onSuccess: () => navigation.goBack(),
          });
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('InvoiceEdit', { id });
  };

  const subtotal = invoice.invoice_lines?.reduce((sum, line) => 
    sum + (line.quantity * parseFloat(line.price)), 0
  ) || 0;

  const totalVat = invoice.invoice_lines?.reduce((sum, line) => 
    sum + (line.quantity * parseFloat(line.price) * parseFloat(line.vat_rate) / 100), 0
  ) || 0;

  const total = subtotal + totalVat;
  return (
    <YStack >
      <Text>Invoice #{invoice.id}</Text>
      
      <YStack>
        <Text>Customer: {invoice.customer ? `${invoice.customer.first_name} ${invoice.customer.last_name}` : ''}</Text>
        <Text>Email: {invoice.customer?.email}</Text>
        <Text>Date: {invoice.date}</Text>
        {invoice.deadline && <Text>Deadline: {invoice.deadline}</Text>}
        <Text>Status: {invoice.finalized ? 'Finalized' : 'Draft'}</Text>
        <Text>Paid: {invoice.paid ? 'Yes' : 'No'}</Text>
      </YStack>

      <YStack>
        <Text>Invoice Lines:</Text>
        {invoice.invoice_lines?.map((line, idx) => (
          <YStack key={idx}>
            <Text>{line.label}</Text>
            <Text>{line.quantity} {line.unit} x €{line.price}</Text>
            <Text>VAT: {line.vat_rate}%</Text>
            <Text>Total: €{(line.quantity * parseFloat(line.price)).toFixed(2)}</Text>
          </YStack>
        ))}
      </YStack>

      <YStack gap="$1">
        <Text>Subtotal: €{subtotal.toFixed(2)}</Text>
        <Text>Total VAT: €{totalVat.toFixed(2)}</Text>
        <Text>Total: €{total.toFixed(2)}</Text>
      </YStack>

      <YStack gap="$2">
        <Button onPress={handleEdit}>Edit</Button>
        {!invoice.finalized && (
          <Button onPress={handleFinalize}>Finalize</Button>
        )}
        <Button onPress={handleTogglePaid}>
          {invoice.paid ? 'Mark as Unpaid' : 'Mark as Paid'}
        </Button>
        <Button onPress={handleDelete}>Delete</Button>
      </YStack>
    </YStack>
  );
}