import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AppText from "../core/AppText";
import icons from "@/constants/icons";
import { padding } from "@/utils/paddingStyling";
import Colors from "@/constants/colors";
import { TextInput } from "react-native-gesture-handler";

// TODO: Accept state for searchTerms
// Import AuthPost.search service

type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        {!isFocused && (
          <Image
            source={icons.search}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder="Search"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ fontSize: 18, fontFamily: "Syne-Regular" }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  searchWrapper: {
    flexDirection: "row",
    backgroundColor: "rgba(56, 57, 57, 0.1)",
    width: "100%",
    ...padding(8, 16, 8, 16),
    alignItems: "center",
    gap: 8,
    height: 40,
  },
});
