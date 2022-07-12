import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Color(props) {
  const colorStyles = StyleSheet.create({
    color: {
      height: 75,
      width: 75,
      backgroundColor: props.color,
      borderRadius: 5,
      marginRight: 15,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity
      style={colorStyles.color}
      onPress={() => props.selectColor()}
    >
      {props.selected === true ? (
        <AntDesign name="check" size={50} color="#fff" />
      ) : null}
    </TouchableOpacity>
  );
}
