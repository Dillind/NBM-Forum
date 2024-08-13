import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/colors";
import { padding } from "@/utils/paddingStyling";
import { type Category } from "@/types/post";
import { CATEGORIES } from "@/constants/categories";
import AppText from "../core/AppText";

type Props = {
  onCategorySelect: (category: string) => void;
};

const ForumCategoryTabs = ({ onCategorySelect }: Props) => {
  const [selectedId, setSelectedId] = useState(1);

  const handlePress = (category: Category) => {
    setSelectedId(category.id);
    onCategorySelect(category.name);
  };

  const renderCategoryTags = ({ item }: { item: Category }) => {
    const backgroundColor =
      item.id === selectedId ? Colors.primaryColor : Colors.greyLight;

    const textColor = item.id === selectedId ? "#FFFFF" : Colors.black;

    return (
      <TouchableOpacity
        onPress={() => handlePress(item)}
        style={[styles.tab, { backgroundColor }]}
      >
        <AppText textStyles={{ color: textColor }}>{item.name}</AppText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CATEGORIES}
        renderItem={renderCategoryTags}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabWrapper}
        extraData={selectedId}
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
