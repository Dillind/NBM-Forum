import React from "react";
import { StyleSheet, View } from "react-native";

const ProgressBar = ({ progress }: { progress: number }) => {
  const renderProgressBar = (progress: number) => {
    switch (progress) {
      case 1:
        return (
          <>
            <View style={styles.rectanglePurple} />
            <View style={styles.rectangleGrey} />
            <View style={styles.rectangleGrey} />
            <View style={styles.rectangleGrey} />
          </>
        );
      case 2:
        return (
          <>
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
            <View style={styles.rectangleGrey} />
            <View style={styles.rectangleGrey} />
          </>
        );
      case 3:
        return (
          <>
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
            <View style={styles.rectangleGrey} />
          </>
        );
      case 4:
        return (
          <>
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
            <View style={styles.rectanglePurple} />
          </>
        );
    }
  };

  return (
    <View style={styles.container}>{renderProgressBar(progress)}</View>
  )
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  rectanglePurple: {
    width: 70,
    height: 8,
    backgroundColor: "#6537FF",
  },
  rectangleGrey: {
    width: 70,
    height: 8,
    backgroundColor: "#383939",
    opacity: 0.2,
  },
});

export default ProgressBar;
