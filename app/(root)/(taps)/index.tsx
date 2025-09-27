/**
 * Home Screen
 * -----------------------------------------------------------------------------
 * This screen displays:
 *  - User greeting with Avatar
 *  - Search bar
 *  - Featured section (horizontal list)
 *  - Recommended section (with filters and vertical grid of cards)
 *
 * Tech Stack:
 *  - React Native + Expo Router
 *  - Tailwind (via nativewind) for styling
 *  - FlatList for performant list rendering
 */

import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Avatar from "@/components/Avatar";
import { Card, FeaturedCard } from "@/components/Card";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { useGlobalContext } from "@/lib/global-provider";
import { formatName } from "@/utils/nameUtils";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const Index: React.FC = () => {
  const { user } = useGlobalContext();
  const router = useRouter();

  /** Dummy data – replace with API response */
  const recommendationData = [1, 2, 3, 4, 5, 6];
  const featuredData = [1, 2, 3];

  /** Handlers --------------------------------------------------------------- */
  const handleCardPress = (id: number) => {
    // TODO: Implement navigation to card detail
    console.log("Card pressed:", id);
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleNotificationPress = () => {
    // TODO: Implement notification screen navigation
    console.log("Notifications pressed");
  };

  /* ------------------------------------------------------------------------ */

  const renderRecommendationCard: ListRenderItem<number> = ({ item }) => (
    <Card onPress={() => handleCardPress(item)} />
  );

  const renderFeaturedCard: ListRenderItem<number> = ({ item }) => (
    <FeaturedCard onPress={() => handleCardPress(item)} />
  );

  /* ------------------------------------------------------------------------ */

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recommendationData}
        renderItem={renderRecommendationCard}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="px-5">
            {/* -----------------------------------------------------------------
               HEADER SECTION
            ----------------------------------------------------------------- */}
            <View className="flex flex-row items-center justify-between">
              {/* User Avatar & Greeting */}
              <TouchableOpacity
                className="flex flex-row items-center"
                onPress={handleProfilePress}
                activeOpacity={0.8}
              >
                <Avatar
                  name={user?.name}
                  avatar={user?.avatar}
                  size={48}
                  editable={false}
                  minimal
                />

                <View className="ml-2">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {formatName(user?.name)}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity
                onPress={handleNotificationPress}
                activeOpacity={0.7}
              >
                <Image source={icons.bell} className="size-6" />
              </TouchableOpacity>
            </View>

            {/* -----------------------------------------------------------------
               SEARCH
            ----------------------------------------------------------------- */}
            <Search />

            {/* -----------------------------------------------------------------
               FEATURED SECTION
            ----------------------------------------------------------------- */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">
                  Featured
                </Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={featuredData}
                renderItem={renderFeaturedCard}
                keyExtractor={(item) => item.toString()}
                horizontal
                bounces={false}
                showsHorizontalScrollIndicator={false}
                contentContainerClassName="flex gap-5 mt-5"
              />
            </View>

            {/* -----------------------------------------------------------------
               RECOMMENDATION SECTION
            ----------------------------------------------------------------- */}
            <View className="flex flex-row items-center justify-between mb-3">
              <Text className="text-xl font-rubik-bold text-black-300">
                Our Recommendation
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-base font-rubik-bold text-primary-300">
                  See all
                </Text>
              </TouchableOpacity>
            </View>

            {/* Filters */}
            <Filters />
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Index;
