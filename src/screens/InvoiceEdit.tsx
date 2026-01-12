import { useRoute, useNavigation } from '@react-navigation/native';
import { Button, YStack, Text } from '../ui';
import { useInvoice, useUpdateInvoice } from '../api/hooks';

export default function InvoiceEdit() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params as { id: number };
  
  const { data: invoice } = useInvoice(id);
  const updateMutation = useUpdateInvoice();

  const handleUpdate = () => {
    navigation.goBack();
  };

  if (!invoice) return <Text>Loading...</Text>;

  return (
    <YStack>
      <Text>Edit Invoice #{invoice.id}</Text>
      <Button onPress={handleUpdate}>Update Invoice</Button>
    </YStack>
  );
}