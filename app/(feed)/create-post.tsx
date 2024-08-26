import TopBarSave from "@/components/core/TopBarSave";
import { StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  TextInput,
} from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import { Post } from "@/types/post";
import Colors from "@/constants/colors";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { router } from "expo-router";
import ErrorMessage from "@/components/core/ErrorMessage";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Post>();

  const { top, bottom } = useSafeAreaInsets();
  const { setData } = useCreatePostStore();
  const onSubmit = (data: Post) => {
    setData(data);
    router.push("/category-post");
  };

  return (
    <GestureHandlerRootView
      style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}
    >
      <TopBarSave
        title="Next"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      />
      <View style={{ display: "flex", gap: 14 }}>
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter post title..."
                placeholderTextColor="#888888"
                style={styles.titleInput}
              />
              {errors.title && <ErrorMessage error={errors.title.message} />}
            </View>
          )}
          rules={{ required: "You must enter a post title" }}
        />
        <Controller
          control={control}
          name="content"
          render={({ field: { onChange, value } }) => (
            <View>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Enter your body text..."
                style={styles.contentInput}
                placeholderTextColor="#888888"
                multiline
              />
              {errors.content && (
                <ErrorMessage error={errors.content.message} />
              )}
            </View>
          )}
          rules={{ required: "You must enter content for your post" }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default CreatePost;

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
  },
});
