import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default Item = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.item} onPress={() => props.reAddItem()}>
          {props.name}
        </Text>
        <TouchableOpacity onPress={() => props.deleteRemovedItem()}>
          <MaterialIcons
            style={styles.delete}
            name="delete"
            size={18}
            color="#666"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  item: {
    // color: "#fff",
    width: "90%",
    fontSize: 16,
    fontStyle: "italic",
    textDecorationLine: "line-through",
  },
  delete: {
    marginLeft: 10,
  },
});
