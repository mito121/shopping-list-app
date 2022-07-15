import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default Item = (props) => {
  return (
    <View>
      <Text>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
