import React, { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SettingsPageProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const SettingsPage = ({ title, description, children }: SettingsPageProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="p-6">
        {/* العنوان */}
        <Text className="text-2xl font-bold">{title}</Text>
        
        {/* الوصف */}
        {description && (
          <Text className="mt-2 text-gray-600">{description}</Text>
        )}

        {/* المحتوى الإضافي */}
        <View className="mt-5">{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;
