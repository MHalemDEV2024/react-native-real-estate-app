import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-lg font-rubik-medium">Account</Text>
    </SafeAreaView>
  );
}
