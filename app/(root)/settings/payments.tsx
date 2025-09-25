import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments() {
  return (
    <SafeAreaView className="flex-1 bg-white px-5 pt-10">
      {/* Header with Back */}
      <View className="flex-row items-center mb-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="text-blue-500 text-base">◀ Back</Text>
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-rubik-medium">Payments</Text>
      </View>

      {/* Screen Content */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-700">Payments settings content here</Text>
      </View>
    </SafeAreaView>
  );
}
