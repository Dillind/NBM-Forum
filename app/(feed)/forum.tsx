import ForumHeader from "@/components/forum/ForumHeader";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
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
import Colors from "@/constants/colors";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Apple");
  const { top, bottom } = useSafeAreaInsets();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKeys.posts, selectedCategory],
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
        if (lastPage.data.length === 0) return undefined;
        return allPages.length + 1;
      },
    });

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

  const renderEmptyComponent = () => {
    if (isFetching && !data) {
      return (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <AppText>No posts found.</AppText>
      </View>
    );
  };

  const renderFooterComponent = () => {
    if (isFetchingNextPage) {
      return (
        <View style={{ paddingVertical: 20 }}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      );
    }
    return null;
  };

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
        ListEmptyComponent={renderEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={renderFooterComponent}
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
    marginTop: 20,
  },
});
