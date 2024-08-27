import AppText from "@/components/core/AppText";
import TopBarSave from "@/components/core/TopBarSave";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery } from "@tanstack/react-query";
import TagService from "@/services/tags/queries";
import { queryKeys } from "@/constants/query-keys";
import { TagsResponse } from "@/types/tags";

const CategoryPost = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { top, bottom } = useSafeAreaInsets();
  const { post, setData } = useCreatePostStore.getState();

  const { data } = useInfiniteQuery({
    queryKey: [queryKeys.tags],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await TagService.getTags({
        page: pageParam,
        limit: 10,
      });
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  const tags = data?.pages.flatMap((page) => page.data) || [];

  const handleCheckboxChange = (categoryName: string) => {
    const isSelected = selectedCategories.includes(categoryName);
    const updatedCategories = isSelected
      ? selectedCategories.filter((name) => name !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(updatedCategories);
  };

  const handleSubmit = () => {
    const postData = {
      ...post,
      tags: selectedCategories,
    };
    setData(postData);
    router.push("/review-post");
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave title="Next" onPress={handleSubmit} />
      <View>
        <AppText
          textStyles={{
            fontFamily: "Syne-Bold",
            fontSize: 25,
            marginBottom: 20,
          }}
        >
          Select a Category
        </AppText>
        <View>
          {tags.map((category) => (
            <View style={styles.checkboxText} key={category.name}>
              <Checkbox
                style={styles.checkboxIcon}
                onValueChange={() => handleCheckboxChange(category.name)}
                value={selectedCategories.includes(category.name)}
                color={
                  selectedCategories.includes(category.name)
                    ? "#4630EB"
                    : undefined
                }
              />
              <AppText textStyles={styles.categoryName}>
                {category.name}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default CategoryPost;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  checkboxIcon: {
    borderColor: "rgba(56, 57, 57, 0.2)",
    margin: 8,
  },
  checkboxText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryName: {
    color: "rgba(56, 57, 57, 0.4)",
    fontSize: 18,
  },
});
