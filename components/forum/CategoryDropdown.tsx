import { View, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/constants/colors";
import { padding } from "@/utils/paddingStyling";
import icons from "@/constants/icons";
import { usePostStore } from "@/store/usePostStore";
import { useCreatePostStore } from "@/store/useCreatePostStore";
import { Tag } from "@/types/tags";
import { useInfiniteQuery } from "@tanstack/react-query";
import TagService from "@/services/tags/queries";

type CategoryDropdownProps = {
  context: "create" | "edit";
};

const CategoryDropdown = ({ context }: CategoryDropdownProps) => {
  const { currentPost } = usePostStore.getState();
  const { post } = useCreatePostStore.getState();

  const { data } = useInfiniteQuery({
    queryKey: ["tags"],
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

  const editPostValue =
    currentPost?.tags && currentPost?.tags.length > 0
      ? currentPost?.tags[0].name
      : "Apple";

  const createPostValue =
    post?.tags && post?.tags.length > 0 ? post?.tags[0] : "Apple";

  const defaultCategory = context === "edit" ? editPostValue : createPostValue;

  const [value, setValue] = useState<string | Tag>(defaultCategory);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={tags}
        maxHeight={214}
        labelField="name"
        valueField="name"
        value={value}
        autoScroll={false}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.name);
          setIsFocus(false);
        }}
        renderRightIcon={() => (
          <Image
            source={icons.arrowDropdown}
            style={{ width: 12, height: 8 }}
            resizeMode="contain"
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoryDropdown;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 150,
  },
  dropdown: {
    height: 34,
    borderColor: Colors.primaryColor,
    borderWidth: 0.5,
    ...padding(4, 16, 4, 16),
    backgroundColor: Colors.primaryColor,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Syne-Regular",
    color: Colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
