import CategoryDropdown from "@/components/forum/CategoryDropdown";
import TopBarSave from "@/components/core/TopBarSave";
import Colors from "@/constants/colors";
import { Post } from "@/types/post";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { usePostStore } from "@/store/usePostStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditPost = () => {
  const { control } = useForm<Post>();
  const { currentPost } = usePostStore.getState();
  const { top, bottom } = useSafeAreaInsets();

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave title="Save" />
      <CategoryDropdown context="edit" />
      <View style={{ display: "flex", gap: 14, marginTop: 24 }}>
        <Controller
          control={control}
          name="title"
          render={() => (
            <TextInput
              value={currentPost?.title}
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
              value={currentPost?.content}
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

export default EditPost;

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
