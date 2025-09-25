import icons from "@/constants/icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="mt-3 flex flex-col items-center">
    <Image
      source={icon}
      style={{ tintColor: focused ? "#0061FF" : "#666876" }}
      resizeMode="contain"
      className="size-6"
    />
    <Text
      className={`mt-1 text-xs w-full text-center ${
        focused
          ? "text-primary-300 font-rubik-medium"
          : "text-black-200 font-rubik"
      }`}
    >
      {title}
    </Text>
  </View>
);

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#fff" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopColor: "#0061ff1a",
            borderTopWidth: 1,
            minHeight: 70,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.home} title="Home" />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.search} title="Explore" />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.person} title="Profile" />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
