import { View, StyleSheet, Image } from "react-native";
import { PostResponse, Tag } from "@/types/post";
import AppText from "../core/AppText";
import Colors from "@/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { padding } from "@/utils/paddingStyling";
import icons from "@/constants/icons";
import { router } from "expo-router";
import { getCurrentUser } from "@/constants/primitives";
import { formatDate } from "@/utils/formatDate";
import { usePostStore } from "@/store/usePostStore";
import { useQuery } from "@tanstack/react-query";

type ForumPostCardProps = {
  post: PostResponse;
};

const ForumPostCard = ({ post }: ForumPostCardProps) => {
  const { setCurrentPost } = usePostStore.getState();

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <AppText>Loading...</AppText>;
  if (isError) return <AppText>Error fetching user data</AppText>;

  const handleEditPost = () => {
    router.push(`/edit-post`);
    setCurrentPost(post);
  };

  const handlePostDetailsSubmit = () => {
    setCurrentPost(post);
    router.push(`/post-expanded?postId=${post.id}`);
  };

  const renderEditButton = () => (
    <TouchableOpacity onPress={handleEditPost}>
      <AppText
        textStyles={{
          color: Colors.primaryColor,
          textDecorationLine: "underline",
        }}
      >
        Edit
      </AppText>
    </TouchableOpacity>
  );

  const renderCategoryTag = (tags: Tag) => (
    <View style={styles.tagWrapper}>
      {tags.map((tag, index) => (
        <View key={index}>
          <AppText textStyles={{ color: Colors.white }}>{tag.name}</AppText>
        </View>
      ))}
    </View>
  );

  const renderComment = (numberOfComments: number) => (
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 4 }}
      onPress={handlePostDetailsSubmit}
    >
      <Image
        source={icons.chatBubble}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
      <AppText>{numberOfComments}</AppText>
    </TouchableOpacity>
  );

  const renderLikes = (numberOfLikes: number) => (
    <TouchableOpacity style={{ flexDirection: "row", gap: 4 }}>
      <Image
        source={icons.thumbsUp}
        resizeMode="contain"
        style={{ width: 20, height: 20 }}
      />
      <AppText>{numberOfLikes}</AppText>
    </TouchableOpacity>
  );

  const { user, comments, likes, content, createdAt, title, tags = [] } = post;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.userInfoContainer}>
          <AppText
            textStyles={[styles.textStyling, { fontFamily: "Syne-Bold" }]}
          >
            {`${user.firstName} ${user.lastName}`}
          </AppText>
          <View style={styles.dot} />
          <AppText textStyles={styles.textStyling}>
            {formatDate(createdAt)}
          </AppText>
        </View>
        <View>{currentUser?.id === post.user.id && renderEditButton()}</View>
      </View>
      <AppText textStyles={styles.postTitle}>{title}</AppText>
      {renderCategoryTag(tags)}
      <AppText textStyles={{ marginVertical: 16 }}>{content}</AppText>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 10,
        }}
      >
        {renderComment(comments)}
        {renderLikes(likes)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    marginVertical: 16,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyling: {
    color: Colors.greyDark,
    opacity: 0.8,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: Colors.primaryColor,
    borderRadius: 9999,
    marginHorizontal: 8,
  },
  postTitle: {
    fontFamily: "Syne-Bold",
    fontSize: 25,
    marginVertical: 8,
  },
  tagWrapper: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: Colors.primaryColor,
    ...padding(4, 16, 4, 16),
    alignSelf: "flex-start",
  },
});

export default ForumPostCard;
