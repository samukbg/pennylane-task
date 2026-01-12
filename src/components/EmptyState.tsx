import { Text, YStack } from '../ui';

export default function EmptyState({ message }: { message: string }) {
  return (
    <YStack>
      <Text>{message}</Text>
    </YStack>
  );
}