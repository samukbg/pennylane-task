import { Input, YStack, Button, Text, XStack } from '../ui';
import ProductSelect from './ProductSelect';
import { useState } from 'react';

export default function InvoiceLineItem({ 
  line, 
  onChange, 
  onRemove 
}: { 
  line: any; 
  onChange: (line: any) => void;
  onRemove: () => void;
}) {
  const [showProductSelect, setShowProductSelect] = useState(!line.product_id);

  return (
    <YStack borderWidth={1}>
      {showProductSelect ? (
        <ProductSelect onSelect={(product) => {
          onChange({ ...line, product_id: product.id, label: product.label, price: product.price });
          setShowProductSelect(false);
        }} />
      ) : (
        <>
          <Text>{line.label}</Text>
          <Input 
            placeholder="Quantity"
            value={line.quantity?.toString()}
            onChangeText={(e) => onChange({ ...line, quantity: parseFloat(e.nativeEvent.text) || 0 })}
            keyboardType="numeric"
          />
          <Input 
            placeholder="Price"
            value={line.price?.toString()}
            onChangeText={(e) => onChange({ ...line, price: parseFloat(e.nativeEvent.text) || 0 })}
            keyboardType="numeric"
          />
          <Button onPress={onRemove}>Remove</Button>
        </>
      )}
    </YStack>
  );
}