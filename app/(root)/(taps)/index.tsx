/**
 * Home Screen
 * -----------------------------------------------------------------------------
 * Shows:
 *  - User greeting with Avatar
 *  - Search bar
 *  - Featured section (horizontal carousel)
 *  - Recommended section (filters + vertical grid)
 *
 * Tech Stack:
 *  - React Native + Expo Router
 *  - Tailwind (via nativewind) for styling
 *  - FlatList for performant list rendering
 */

import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
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
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { formatName } from "@/utils/nameUtils";
import { Models } from "react-native-appwrite";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const Index: React.FC = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

  // Featured (latest) properties
  const {
    data: latestProperties,
    loading: latestLoading,
  } = useAppwrite({
    fn: getLatestProperties,
  });

  // Recommended properties (with filters)
  const {
    data: properties,
    loading,
    refetch,
  } = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 6,
    },
    skip: true,
  });

  // Refetch when filter or query changes
  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!  ,
      limit: 6,
    });
  }, [params.filter, params.query]);

  /** Data Sources ----------------------------------------------------------- */
  const recommendedData = properties || [];
  const featuredData = latestProperties || [];

  /** Handlers --------------------------------------------------------------- */
  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  const handleProfilePress = () => {
    router.push("/profile");
  };

  const handleNotificationPress = () => {
    // TODO: Navigate to notifications screen
    console.log("Notifications pressed");
  };

  /** Renderers -------------------------------------------------------------- */
  const renderRecommendationCard: ListRenderItem<Models.Document> = ({ item }) => (
    <Card item={item} onPress={() => handleCardPress(item.$id)} />
  );

  const renderFeaturedCard: ListRenderItem<Models.Document> = ({ item }) => (
    <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />
  );

  /* ------------------------------------------------------------------------ */

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={recommendedData}
        renderItem={renderRecommendationCard}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
           loading ? (
            <ActivityIndicator size="large" className="text-primary-300 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <View className="px-5">
            {/* Header Section */}
            <View className="flex flex-row items-center justify-between">
              {/* User Avatar + Greeting */}
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
                    {formatName(user?.name || "Guest")}
                  </Text>
                </View>
              </TouchableOpacity>

              {/* Notifications */}
              <TouchableOpacity onPress={handleNotificationPress} activeOpacity={0.7}>
                <Image source={icons.bell} className="size-6" />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <Search />

            {/* Featured Section */}
            <View className="my-5">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                <TouchableOpacity activeOpacity={0.7}>
                  <Text className="text-base font-rubik-bold text-primary-300">
                    See all
                  </Text>
                </TouchableOpacity>
              </View>

              {latestLoading ? (
                <ActivityIndicator size="large" className="text-primary-300 mt-5" />
              ) : featuredData.length === 0 ? (
                <NoResults />
              ) : (
                <FlatList
                  data={featuredData}
                  renderItem={renderFeaturedCard}
                  keyExtractor={(item) => item.$id}
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              )}
            </View>

            {/* Recommendation Section */}
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
