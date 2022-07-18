import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default Item = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: props.color,
      borderRadius: 5,
      padding: 8,
      marginVertical: 10,
      marginRight: 10,
      alignSelf: "flex-start",
    },
    text: {
      color: "#fff",
      fontWeight: "700",
      // fontSize: 16
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => props.press()}>
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
};
