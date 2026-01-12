import { useState } from 'react';
import { Input, YStack, Button, Text } from '../ui';
import { useProducts } from '../api/hooks';

export default function ProductSelect({ onSelect }: { onSelect: (product: any) => void }) {
  const [search, setSearch] = useState('');
  const { data } = useProducts(search);

  return (
    <YStack gap="$2">
      <Input 
        placeholder="Search product..."
        value={search}
        onChangeText={(e) => setSearch(e.nativeEvent.text)}
      />
      {data?.products?.map((product) => (
        <Button key={product.id} onPress={() => onSelect(product)}>
          <Text>{product.label} - ${product.unit_price}</Text>
        </Button>
      ))}
    </YStack>
  );
}