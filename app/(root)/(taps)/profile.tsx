import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { settings } from "@/constants/data";
import icons from "@/constants/icons";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

import Avatar from "@/components/Avatar";
import SettingItem from "@/components/SettingItem";

const ProfileScreen = () => {
  const { user, refetch } = useGlobalContext();
  const router = useRouter();

  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      Alert.alert("Success", "You have been logged out");
      refetch();
    } else {
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* Avatar */}
        <View className="flex-row justify-center mt-5">
          <Avatar name={user?.name} avatar={user?.avatar} />
        </View>

        {/* Settings - Dynamic */}
        <View className="flex flex-col mt-10">
          {settings.map((item, index) => (
            <SettingItem
              key={index}
              icon={item.icon}
              title={item.title}
              onPress={() => router.push(item.path as any)}
            />
          ))}
        </View>

        {/* Logout */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger"
            showArrow={false}
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
