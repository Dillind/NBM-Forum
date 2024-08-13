import { View, StyleSheet } from "react-native";
import React from "react";
import { CommentResponse } from "@/types/comment";
import AppText from "../core/AppText";
import { useQuery } from "@tanstack/react-query";
import CommentService from "@/services/comments/queries";
import PostUserInformation from "./PostUserInformation";
import WriteReplyInput from "./WriteReplyInput";

type CommentThreadProps = {
  comment: CommentResponse;
};

const CommentThread = ({ comment }: CommentThreadProps) => {
  const {
    data: postCommentsReplies,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getReplies", comment.postId, comment.id],
    queryFn: async () => {
      if (!comment.id) {
        return { data: [], total: 0 };
      }
      return CommentService.getCommentById(1, 1, comment.postId, comment.id);
    },
    enabled: comment.id !== undefined,
  });

  const renderReplies = () => {
    if (isLoading) return <AppText>Loading replies...</AppText>;
    if (isError) return <AppText>Error: {error.message}</AppText>;
    if (!postCommentsReplies || postCommentsReplies.data.length === 0) {
      return <WriteReplyInput />;
    }

    return postCommentsReplies.data.map((reply: CommentResponse) => (
      <View key={reply.id} style={styles.replyWrapper}>
        <View style={styles.verticalBar} />
        <View style={styles.replyContent}>
          <PostUserInformation userInfo={reply} />
          <WriteReplyInput />
        </View>
      </View>
    ));
  };

  return (
    <View>
      <PostUserInformation userInfo={comment} />
      {renderReplies()}
    </View>
  );
};

export default CommentThread;

const styles = StyleSheet.create({
  replyWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
  },
  verticalBar: {
    width: 2,
    backgroundColor: "rgba(232, 232, 232, 1)",
    marginRight: 8,
    height: "70%",
  },
  replyContent: {
    flex: 1,
    marginLeft: 22,
  },
});
