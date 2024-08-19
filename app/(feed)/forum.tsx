import ForumHeader from "@/components/forum/ForumHeader";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchBar from "@/components/forum/SearchBar";
import { useCallback, useState } from "react";
import ForumCategoryTabs from "@/components/forum/ForumCategoryTabs";
import PostService from "@/services/posts/queries";
import { useInfiniteQuery } from "@tanstack/react-query";
import AppText from "@/components/core/AppText";
import { PostResponse } from "@/types/post";
import ForumPostCard from "@/components/forum/ForumPostCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Design");
  const { top, bottom } = useSafeAreaInsets();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["posts", selectedCategory],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await PostService.searchPosts({
        page: pageParam,
        limit: 10,
        tags: selectedCategory ? [selectedCategory] : [],
      });
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  // Combines all pages of data and sorts the posts in descending order (from newest to oldest) //TODO: Look into.
  const posts =
    data?.pages
      .flatMap((page) => page.data)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ) || [];

  const renderSeperator = () => (
    <View
      style={{
        width: "100%",
        height: 5,
        backgroundColor: "rgba(232, 232, 232, 1)",
      }}
    />
  );

  const renderPost = useCallback(
    ({ item }: { item: PostResponse }) => (
      <View key={item.id}>
        <ForumPostCard post={item} />
      </View>
    ),
    []
  );

  return (
    <GestureHandlerRootView
      style={[{ paddingTop: top, paddingBottom: bottom }, styles.container]}
    >
      <FlatList
        ListHeaderComponent={
          <>
            <ForumHeader />
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
            <ForumCategoryTabs
              onCategorySelect={(category) => setSelectedCategory(category)}
            />
            {renderSeperator()}
          </>
        }
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            {posts.length === 0 && <AppText>No posts found.</AppText>}
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        initialNumToRender={5}
        showsVerticalScrollIndicator={false}
      />
    </GestureHandlerRootView>
  );
};

export default Forum;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  separator: {
    height: 5,
    backgroundColor: "rgba(232, 232, 232, 1)",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
