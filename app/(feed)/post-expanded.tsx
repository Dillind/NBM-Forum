import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import TopBar from "@/components/core/TopBar";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import ReplyBar from "@/components/forum/ReplyBar";
import { useLocalSearchParams } from "expo-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import CommentService from "@/services/comments/queries";
import AppText from "@/components/core/AppText";
import CommentThread from "@/components/forum/CommentThread";
import Colors from "@/constants/colors";
import { usePostStore } from "@/store/usePostStore";
import ForumPostCard from "@/components/forum/ForumPostCard";
import { CommentResponse } from "@/types/comment";

const PostExpanded = () => {
  const { postId } = useLocalSearchParams();
  const { currentPost } = usePostStore.getState();

  // converts the postId string to a number
  const numericPostId = Number(postId);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["fetchComments", numericPostId],
    queryFn: async ({ pageParam = 1 }) => {
      const result = await CommentService.getComments({
        postId: numericPostId,
        page: pageParam,
        limit: 5,
      });
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  // combines all pages of data
  const comments = data?.pages.flatMap((page) => page.data) || [];

  const renderSeperator = () => (
    <View
      style={{
        width: "100%",
        height: 5,
        backgroundColor: "rgba(232, 232, 232, 1)",
      }}
    />
  );

  const renderComments = useCallback(
    ({ item }: { item: CommentResponse }) => (
      <View key={item.id} style={{ paddingHorizontal: 24 }}>
        <CommentThread comment={item} />
      </View>
    ),
    []
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.innerContainer}>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={{ paddingLeft: 24 }}>
                <TopBar title="Post" />
              </View>
              {currentPost ? (
                <>
                  <ForumPostCard post={currentPost} />
                  {renderSeperator()}
                </>
              ) : (
                <AppText>No post found.</AppText>
              )}
              <View style={{ paddingHorizontal: 24, marginVertical: 15 }}>
                <AppText textStyles={styles.commentHeaderStyling}>
                  Comments
                </AppText>
              </View>
            </>
          }
          data={comments}
          keyExtractor={(item) => item?.id?.toString()}
          renderItem={renderComments}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              {comments?.length === 0 && <AppText>No comments found.</AppText>}
            </View>
          }
          contentContainerStyle={styles.listContentContainer}
          extraData={numericPostId}
        />
        <View style={styles.replyBar}>
          <ReplyBar postId={numericPostId} />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default PostExpanded;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    flex: 1,
  },
  listContentContainer: {
    gap: 5,
  },
  replyBar: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  commentHeaderStyling: {
    fontSize: 16,
    fontFamily: "Syne-Bold",
  },
});
