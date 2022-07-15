import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default Item = (props) => {
  const Indexstyles = StyleSheet.create({
    indexBox: {
      backgroundColor: props.color || "#3E3364",
      borderBottomRightRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
      // marginRight: 10,
      width: 50,
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={Indexstyles.indexBox}>
        {/* <Text style={styles.index}>{props.index}</Text> */}
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{props.name}</Text>
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
    marginHorizontal: 20,
  },
  indexContainer: {
    backgroundColor: "#eee",
    // borderRadius: 12,
    // borderBottomRightRadius: 0,
    // borderTopRightRadius: 0,
    // borderBottomLeftRadius: 12,
    // borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  index: {
    color: "#fff",
    fontSize: 20,
  },
  itemContainer: {
    backgroundColor: "#eee",
    // borderRadius: 12,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
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
  },
  delete: {
    marginLeft: 10,
  },
});
