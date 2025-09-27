/**
 * Card Components
 * -----------------------------------------------------------------------------
 * Two types of cards for property listing:
 *
 * 1. FeaturedCard
 *    - Large, visually rich card with gradient overlay.
 *    - Typically used in a horizontal featured list.
 *
 * 2. Card
 *    - Compact vertical card for grid view.
 *
 * Props:
 *  - onPress: () => void  → callback when card is tapped.
 *
 * Notes:
 *  - Replace static images and text with dynamic props from API in production.
 */

import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import icons from "@/constants/icons";
import images from "@/constants/images";

/* -------------------------------------------------------------------------- */
/*                             TYPE DEFINITIONS                               */
/* -------------------------------------------------------------------------- */

interface CardProps {
  onPress: () => void;
}

/* -------------------------------------------------------------------------- */
/*                              FEATURED CARD                                 */
/* -------------------------------------------------------------------------- */

export const FeaturedCard: React.FC<CardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="relative w-60 h-80 rounded-2xl overflow-hidden"
      accessibilityRole="button"
      accessibilityLabel="Featured property card"
    >
      {/* Main Image */}
      <Image source={images.japan} className="size-full" resizeMode="cover" />

      {/* Gradient Overlay */}
      <Image
        source={images.cardGradient}
        className="size-full absolute bottom-0"
        resizeMode="stretch"
      />

      {/* Rating Badge */}
      <View className="absolute top-5 right-5 flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full">
        <Image source={icons.star} className="size-3.5" resizeMode="contain" />
        <Text className="ml-1 text-xs font-rubik-bold text-primary-300">
          4.8
        </Text>
      </View>

      {/* Bottom Details */}
      <View className="absolute bottom-5 inset-x-5 flex flex-col">
        <Text
          className="text-white text-xl font-rubik-extrabold"
          numberOfLines={1}
        >
          Modernica Apartment
        </Text>
        <Text className="text-white text-base font-rubik">New York, US</Text>

        <View className="mt-1 flex flex-row items-center justify-between">
          <Text className="text-white text-xl font-rubik-extrabold">
            $2,500
          </Text>
          <Image source={icons.heart} className="size-5" resizeMode="contain" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/* -------------------------------------------------------------------------- */
/*                                  CARD                                      */
/* -------------------------------------------------------------------------- */

export const Card: React.FC<CardProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="relative flex-1 mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/10"
      accessibilityRole="button"
      accessibilityLabel="Property card"
    >
      {/* Rating Badge */}
      <View className="absolute top-5 right-5 z-50 flex flex-row items-center bg-white/90 px-2 py-1 rounded-full">
        <Image source={icons.star} className="size-2.5" resizeMode="contain" />
        <Text className="ml-0.5 text-xs font-rubik-bold text-primary-300">
          4.4
        </Text>
      </View>

      {/* Main Image */}
      <Image
        source={images.newYork}
        className="w-full h-40 rounded-lg"
        resizeMode="cover"
      />

      {/* Card Content */}
      <View className="mt-2 flex flex-col">
        <Text
          className="text-base font-rubik-bold text-black-300"
          numberOfLines={1}
        >
          La Grand Maison
        </Text>
        <Text className="text-xs font-rubik text-black-100">Tokyo, Japan</Text>

        <View className="mt-2 flex flex-row items-center justify-between">
          <Text className="text-base font-rubik-bold text-primary-300">
            $12,219
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
