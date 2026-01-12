import { useState } from 'react';
import { FlatList } from 'react-native';
import { Button, YStack, Text, Input } from '../ui';
import { useNavigation } from '@react-navigation/native';
import { useInvoices } from '../api/hooks';
import InvoiceListItem from '../components/InvoiceListItem';
import EmptyState from '../components/EmptyState';

export default function Home() {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const { data, isLoading, refetch } = useInvoices({ page: 1, per_page: 50 });

  const invoices = data?.invoices || [];

  return (
    <YStack flex={1}>
      <Input 
        placeholder="Search invoices..." 
        value={search}
        onChangeText={(e) => setSearch(e.nativeEvent.text)}
      />
      
      {isLoading ? (
        <Text>Loading...</Text>
      ) : invoices.length === 0 ? (
        <EmptyState message="No invoices found" />
      ) : (
        <FlatList
          data={invoices}
          renderItem={({ item }) => <InvoiceListItem invoice={item} />}
          keyExtractor={(item) => item.id.toString()}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}
      
      <Button onPress={() => navigation.navigate('Editor')}>
        Create a new one
      </Button>
    </YStack>
  );
}