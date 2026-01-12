import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, YStack, Text, Input } from '../ui';
import { useInvoice, useUpdateInvoice } from '../api/hooks';
import { useState, useEffect } from 'react';
import CustomerSelect from '../components/CustomerSelect';
import InvoiceLineItem from '../components/InvoiceLineItem';

export default function InvoiceEdit() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  
  const { data: invoice, isLoading } = useInvoice(id);
  const updateMutation = useUpdateInvoice();

  const [customerId, setCustomerId] = useState<number | null>(null);
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [lines, setLines] = useState<any[]>([]);
  const [showCustomerSelect, setShowCustomerSelect] = useState(false);

  useEffect(() => {
    if (invoice) {
      setCustomerId(invoice.customer_id);
      setDate(invoice.date || '');
      setDeadline(invoice.deadline || '');
      setLines(invoice.invoice_lines || []);
    }
  }, [invoice]);

  const handleAddLine = () => {
    setLines([...lines, { 
      product_id: null, 
      quantity: 1, 
      price: 0, 
      label: '', 
      unit: 'piece', 
      vat_rate: '20' 
    }]);
  };

  const handleUpdate = () => {
    if (!customerId) {
      alert('Please select a customer');
      return;
    }

    const payload: any = {
      customer_id: customerId,
      date,
      deadline: deadline || undefined,
    };

    const existingLines = lines.filter(l => l.id);
    const newLines = lines.filter(l => !l.id && l.product_id);

    payload.invoice_lines_attributes = [
      ...existingLines.map(l => ({
        id: l.id,
        product_id: l.product_id,
        quantity: l.quantity,
        price: l.price,
        label: l.label,
        unit: l.unit,
        vat_rate: l.vat_rate,
      })),
      ...newLines.map(l => ({
        product_id: l.product_id,
        quantity: l.quantity,
        price: l.price,
        label: l.label,
        unit: l.unit,
        vat_rate: l.vat_rate,
      })),
    ];

    updateMutation.mutate({ id, data: payload }, {
      onSuccess: () => navigation.goBack(),
    });
  };

  if (isLoading || !invoice) return <Text>Loading...</Text>;

  return (
    <YStack>
      <Text>Edit Invoice #{invoice.id}</Text>

      {showCustomerSelect ? (
        <CustomerSelect onSelect={(customer) => {
          setCustomerId(customer.id);
          setShowCustomerSelect(false);
        }} />
      ) : (
        <Button onPress={() => setShowCustomerSelect(true)}>
          Change Customer: {invoice.customer?.first_name} {invoice.customer?.last_name}
        </Button>
      )}

      <Input
        placeholder="Date (DD-MM-YYYY)"
        value={date}
        onChangeText={(e) => setDate(e.nativeEvent.text)}
      />

      <Input
        placeholder="Deadline (DD-MM-YYYY)"
        value={deadline}
        onChangeText={(e) => setDeadline(e.nativeEvent.text)}
      />

      <Text>Invoice Lines:</Text>
      {lines.map((line, idx) => (
        <InvoiceLineItem
          key={idx}
          line={line}
          onChange={(updated) => {
            const newLines = [...lines];
            newLines[idx] = updated;
            setLines(newLines);
          }}
          onRemove={() => setLines(lines.filter((_, i) => i !== idx))}
        />
      ))}

      <Button onPress={handleAddLine}>Add Line</Button>
      <Button onPress={handleUpdate} disabled={updateMutation.isPending}>
        {updateMutation.isPending ? 'Updating...' : 'Update Invoice'}
      </Button>
    </YStack>
  );
}