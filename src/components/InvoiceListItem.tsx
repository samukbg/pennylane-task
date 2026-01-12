import { Text, YStack, Button } from '../ui';
import { useNavigation } from '@react-navigation/native';

export default function InvoiceListItem({ invoice }: { invoice: any }) {
  const navigation = useNavigation();
  
  return (
    <Button onPress={() => navigation.navigate('InvoiceDetail', { id: invoice.id })}>
      <YStack>
        <Text>#{invoice.id} - {invoice.customer?.label}</Text>
        <Text>{invoice.finalized ? 'Finalized' : 'Draft'}</Text>
      </YStack>
    </Button>
  );
}