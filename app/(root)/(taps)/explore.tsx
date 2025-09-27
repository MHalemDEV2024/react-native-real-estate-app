/**
 * Explore Screen
 * -----------------------------------------------------------------------------
 * Shows:
 *  - Back navigation and screen title
 *  - Search bar
 *  - Filters for refining property results
 *  - Recommended properties (vertical grid with cards)
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

import { Card } from "@/components/Card";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { Models } from "react-native-appwrite";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */
export default function Explore() {
  const router = useRouter();
  const params = useLocalSearchParams<{ query?: string; filter?: string }>();

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
      query: params.query!,
      limit: 20,
    });
  }, [params.filter, params.query]);

  /** Data Sources ----------------------------------------------------------- */
  const recommendedData = properties || [];

  /** Handlers --------------------------------------------------------------- */
  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`);
  };

  /** Renderers -------------------------------------------------------------- */
  const renderRecommendationCard: ListRenderItem<Models.Document> = ({
    item,
  }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />;

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
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-6" />
              </TouchableOpacity>
              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for Your Ideal Home
              </Text>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} properties
              </Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
