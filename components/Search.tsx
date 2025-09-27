/**
 * Search Component
 * -----------------------------------------------------------------------------
 * A reusable search input field with debounce functionality.
 *
 * Features:
 *  - Syncs search query with route params (expo-router).
 *  - Debounces input changes to prevent excessive updates.
 *  - Displays search icon and filter button.
 *
 * Usage:
 *  <Search />
 *
 */

import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { useDebouncedCallback } from "use-debounce";

import { COLORS } from "@/constants/colors";
import icons from "@/constants/icons";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const Search: React.FC = () => {
  /** Current route path (useful if search behavior differs per screen) */
  const path = usePathname();

  /** Extract `query` param from URL (if any) */
  const params = useLocalSearchParams<{ query?: string }>();

  /** Controlled state for search input */
  const [search, setSearch] = useState(params.query ?? "");

  /** Debounced function to update query param in URL */
  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text || undefined });
  }, 500);

  /** Handle text change */
  const handleSearchChange = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  /** Handle filter button press */
  const handleFilterPress = () => {
    // TODO: Navigate to filter screen or open modal
    console.log("Filter button pressed from:", path);
  };

  /* ------------------------------------------------------------------------ */

  return (
    <View className="flex flex-row items-center justify-between w-full px-4 py-2 mt-5 rounded-lg bg-accent-100 border border-primary-100">
      {/* Search Input */}
      <View className="flex-1 flex flex-row items-center">
        <Image source={icons.search} className="size-5" />
        <TextInput
          value={search}
          onChangeText={handleSearchChange}
          placeholder="Search something..."
          placeholderTextColor={COLORS.black[100]}
          className="ml-2 flex-1 text-sm font-rubik text-black-200"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      {/* Filter Button */}
      <TouchableOpacity onPress={handleFilterPress} activeOpacity={0.7}>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
