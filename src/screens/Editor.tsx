import { useState } from 'react';
import { Button, YStack, Text } from '../ui';
import { useNavigation } from '@react-navigation/native';
import { useCreateInvoice } from '../api/hooks';
import CustomerSelect from '../components/CustomerSelect';
import InvoiceLineItem from '../components/InvoiceLineItem';

export default function Editor() {
  const navigation = useNavigation();
  const createMutation = useCreateInvoice();
  
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [lines, setLines] = useState([{ product_id: null, quantity: 1, price: 0, label: '', unit: 'piece', vat_rate: '20' }]);

  const handleAddLine = () => {
    setLines([...lines, { product_id: null, quantity: 1, price: 0, label: '', unit: 'piece', vat_rate: '20' }]);
  };

  const handleCreateInvoice = (finalized: boolean) => {
    if (!customerId) {
      alert('Select a customer');
      return;
    }

    createMutation.mutate({
      customer_id: customerId,
      finalized,
      date: new Date().toISOString().split('T')[0],
      invoice_lines: lines.filter(l => l.product_id),
    }, {
      onSuccess: () => navigation.navigate('Home'),
    });
  };

  return (
    <YStack>
      <Text>Create Invoice</Text>
      
      {!customerId ? (
        <CustomerSelect onSelect={(customer: any) => setCustomerId(customer.id)} />
      ) : (
        <Text>Customer selected</Text>
      )}

      {lines.map((line, idx) => (
        <InvoiceLineItem
          key={idx}
          line={line}
          onChange={(updated: any) => {
            const newLines = [...lines];
            newLines[idx] = updated;
            setLines(newLines);
          }}
          onRemove={() => setLines(lines.filter((_, i) => i !== idx))}
        />
      ))}

      <Button onPress={handleAddLine}>Add Line</Button>
      <Button onPress={() => handleCreateInvoice(false)}>Save Draft</Button>
      <Button onPress={() => handleCreateInvoice(true)}>Submit</Button>
    </YStack>
  );
}