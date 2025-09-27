/**
 * Filters Component
 * -----------------------------------------------------------------------------
 * Horizontal scrollable list of category filters.
 *
 * Features:
 *  - Uses expo-router to sync selected filter with URL params.
 *  - Highlights the currently active filter.
 *  - Toggles filter back to "All" if the same filter is tapped again.
 *
 * Usage:
 *  <Filters />
 *
 * Dependencies:
 *  - categories: imported from "@/constants/data"
 *  - expo-router for URL state management
 */

import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

import { categories } from "@/constants/data";

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

const Filters: React.FC = () => {
  /** Get current filter from URL params */
  const params = useLocalSearchParams<{ filter?: string }>();

  /** State for selected filter, defaults to "All" */
  const [selectedCategory, setSelectedCategory] = useState<string>(
    params.filter || "All"
  );

  /* ------------------------------------------------------------------------ */
  /** Handle category button click */
  const handleCategoryPress = (category: string) => {
    // If clicking the active filter, reset to "All"
    if (category === selectedCategory) {
      setSelectedCategory("All");
      router.setParams({ filter: "All" });
      return;
    }

    // Otherwise, set the selected category
    setSelectedCategory(category);
    router.setParams({ filter: category });
  };

  /* ------------------------------------------------------------------------ */

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-3 mb-2"
      contentContainerStyle={{ paddingRight: 16 }}
    >
      {categories.map((item) => {
        const isActive = selectedCategory === item.category;

        return (
          <TouchableOpacity
            key={item.category}
            onPress={() => handleCategoryPress(item.category)}
            activeOpacity={0.8}
            className={`mr-4 px-4 py-2 rounded-full border ${
              isActive
                ? "bg-primary-300 border-primary-300"
                : "bg-gray-100 border-primary-100"
            }`}
          >
            <Text
              className={`text-sm ${
                isActive
                  ? "text-white font-rubik-bold"
                  : "text-black-300 font-rubik"
              }`}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default Filters;
