import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold my-10 font-rubik text-3xl">Welcome to ReState</Text>

      <Link href="/sign-in">
        <Text className="text-blue-500 m-1">Sign In</Text>
      </Link>

      <Link href="/explore">
        <Text className="text-blue-500 m-1">Explore</Text>
      </Link>

      <Link href="/profile">
        <Text className="text-blue-500 m-1">Profile</Text>
      </Link>

      <Link href="./properties/[id]">
        <Text className="text-blue-500 m-1">Property</Text>
      </Link>
    </View>
  );
}
