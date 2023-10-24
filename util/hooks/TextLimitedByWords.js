import React from "react";
import { Text, StyleSheet } from "react-native";

const TextLimitedByWords = ({ text }) => {
  // Split the text into words and limit to the specified number of words
  const words = text.split(" ").slice(0, 2).join(" ");
  const ellipsis = text.split(" ").length > 2 ? "..." : "";
  return <Text style={styles.textStyle}>{words + ellipsis}</Text>;
};

export default TextLimitedByWords;

const styles = StyleSheet.create({
  textStyle: {
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});
