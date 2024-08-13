import CategoryDropdown from "@/components/forum/CategoryDropdown";
import TopBarSave from "@/components/core/TopBarSave";
import Colors from "@/constants/colors";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { Post } from "@/types/post";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { useCreatePostMutation } from "@/services/posts/mutations";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ReviewPost = () => {
  const { control } = useForm<Post>();
  const { post } = useCreatePostStore.getState();
  const { top, bottom } = useSafeAreaInsets();

  const { mutate: createPost } = useCreatePostMutation();

  const handleCreatePost = async () => {
    const postData = {
      ...post,
    };

    try {
      createPost(postData);
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave title="Post" onPress={() => handleCreatePost()} />
      <CategoryDropdown context="create" />
      <View style={{ display: "flex", gap: 14, marginTop: 24 }}>
        <Controller
          control={control}
          name="title"
          render={() => (
            <TextInput
              value={post.title}
              style={styles.titleInput}
              editable={false}
            />
          )}
        />
        <Controller
          control={control}
          name="content"
          render={() => (
            <TextInput
              value={post.content}
              style={styles.contentInput}
              multiline
              editable={false}
            />
          )}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default ReviewPost;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    padding: 24,
  },
  titleInput: {
    fontFamily: "Syne-Bold",
    fontSize: 25,
    color: Colors.greyDark,
  },
  contentInput: {
    fontFamily: "Syne-Regular",
    fontSize: 14,
    color: Colors.greyDark,
    marginLeft: 2,
  },
});
