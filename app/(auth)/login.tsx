import { Redirect } from "expo-router";
import React from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons"; // Google icon
import images from "@/constants/images"; // Onboarding illustration
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";

const SignIn = () => {
  const { refetch, loading, isLogged } = useGlobalContext();

  // Redirect user if already logged in
  if (!loading && isLogged) return <Redirect href="/(root)/(taps)" />;

  // Handle Google login
  const handleLogin = async () => {
    try {
      const result = await login();
      if (result) {
        console.log("✅ Login successful");
        refetch();
      } else {
        Alert.alert("Login Failed", "Please try again.");
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false}
      >
        {/* Top illustration */}
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />

        {/* Text & Button Section */}
        <View className="px-10">
          {/* Welcome text */}
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>

          {/* Headline */}
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let&apos;s Get You Closer to{"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          {/* Login prompt */}
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>

          {/* Google login button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.7}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
