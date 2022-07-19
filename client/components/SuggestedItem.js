import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default Item = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      backgroundColor: props.color,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginVertical: 10,
      marginRight: 10,
      alignSelf: "flex-start",
    },
    text: {
      color: "#fff",
      fontWeight: "700",
      // fontSize: 16
    },
    check: {
      margin: 0,
      paddingRight: 5
    }
  });

  return (
    <TouchableOpacity style={styles.container} onPress={() => props.press()}>
      {props.isActive === true ? (
        <AntDesign name="check" size={18} color="#fff" style={styles.check} />
      ) : null}
      {/* {isActive()} */}
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
};
