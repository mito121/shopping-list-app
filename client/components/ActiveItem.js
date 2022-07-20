import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default ActiveItem = (props) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
    },
    index: {
      color: "#fff",
      fontSize: 20,
    },
    itemContainer: {
      borderLeftWidth: 3,
      borderLeftColor: props.color,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 7,
      // minHeight: 50,
    },
    item: {
      fontSize: 16,
    },
    delete: {
      marginLeft: 10,
    },
    hr: {
      marginHorizontal: 13,
      marginVertical: 7,
      height: 2,
      borderBottomWidth: 2,
      borderBottomColor: "#eee",
      borderStyle: "dashed",
    },
  });

  const underline = () => {
    if (!props.underline) return;
    return <View style={styles.hr}></View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.item}>{props.name}</Text>
        <TouchableOpacity onPress={() => props.removeItem()}>
          <MaterialIcons
            style={styles.delete}
            name="delete"
            size={18}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {underline()}
    </View>
  );
};
