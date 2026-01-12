import { useState } from 'react';
import { Input, YStack, Button, Text } from '../ui';
import { useCustomers } from '../api/hooks';

export default function CustomerSelect({ onSelect }: { onSelect: (customer: any) => void }) {
  const [search, setSearch] = useState('');
  const { data } = useCustomers(search);

  return (
    <YStack gap="$2">
      <Input 
        placeholder="Search customer..."
        value={search}
        onChangeText={(e) => setSearch(e.nativeEvent.text)}
      />
      {data?.customers?.map((customer) => (
        <Button key={customer.id} onPress={() => onSelect(customer)}>
          <Text>{customer.first_name} {customer.last_name}</Text>
        </Button>
      ))}
    </YStack>
  );
}