import { login } from "@/lib/appwrite";
import React from "react";
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import icons from "@/constants/icons"; // Importing app icons (e.g., Google logo)
import images from "@/constants/images"; // Importing app images (e.g., onboarding illustration)
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";

const SignIn = () => {

  const {refetch, loading, isLogged} = useGlobalContext();

    if(!loading && isLogged) return <Redirect href="/" />;
  // Handle login logic (currently just a console log for demo purposes)
  const handleLogin = async () => {
    //console.log("Login pressed");

    const result = await login();
    if(result) {
      console.log("Login successful");
      refetch();
    } else {
      Alert.alert("Error", "Please try again.")
      console.log("Login failed");
    }
  };

  return (
    // Ensures content respects notches and safe areas (iOS/Android)
    <SafeAreaView className="flex-1 bg-white">
      {/* ScrollView allows vertical scrolling if content overflows */}
      <ScrollView
        contentContainerClassName="flex-grow"
        showsVerticalScrollIndicator={false} // Hides scroll indicator for clean UI
      >
        {/* Top illustration image */}
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain" // Keeps aspect ratio
        />

        {/* Content container */}
        <View className="px-10">
          {/* Welcome message */}
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>

          {/* Headline with highlighted keyword */}
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let&apos;s Get You Closer to{"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          {/* Login instruction */}
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>

          {/* Google Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.7} // Slight fade on press for better UX
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              {/* Google logo */}
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              {/* Button text */}
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
