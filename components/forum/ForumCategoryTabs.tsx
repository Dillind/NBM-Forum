import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import { padding } from "@/utils/paddingStyling";
import AppText from "../core/AppText";
import { Tag } from "@/types/tags";
import { useInfiniteQuery } from "@tanstack/react-query";
import TagService from "@/services/tags/queries";

type Props = {
  onCategorySelect: (category: string) => void;
};

const ForumCategoryTabs = ({ onCategorySelect }: Props) => {
  const [selectedTagName, setSelectedTagName] = useState<string>("Apple");

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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

  const tags = data?.pages.flatMap((page) => page.data);

  const handlePress = (category: Tag) => {
    setSelectedTagName(category.name);
    onCategorySelect(category.name);
  };

  const renderCategoryTags = ({ item }: { item: Tag }) => {
    const tagBackgroundColor =
      item.name === selectedTagName ? Colors.primaryColor : Colors.greyLight;

    const tagTextColor =
      item.name === selectedTagName ? "#FFFFF" : Colors.black;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={[styles.tab, { backgroundColor: tagBackgroundColor }]}
      >
        <AppText textStyles={{ color: tagTextColor }}>{item.name}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tags}
        renderItem={renderCategoryTags}
        keyExtractor={(item) => item.name}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        initialNumToRender={5}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabWrapper}
      />
    </View>
  );
};

export default ForumCategoryTabs;

const styles = StyleSheet.create({
  container: {
    marginVertical: 18,
    paddingLeft: 24,
  },
  tabWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  tab: {
    ...padding(4, 16, 4, 16),
  },
});
