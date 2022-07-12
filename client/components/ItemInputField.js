import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ItemInputField(props) {
  const [item, setItem] = useState();

  const handleAddItem = (value) => {
    props.addItem(value);
    setItem(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.inputField}
        value={item}
        onChangeText={(text) => setItem(text)}
        placeholder={"+ Ny vare"}
        placeholderTextColor={"#666"}
        onFocus={() => {
          props.addingItem(true);
        }}
        onBlur={() => {
          props.addingItem(false);
        }}
      />
      <TouchableOpacity onPress={() => handleAddItem(item)}>
        <View style={styles.button}>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#fff",
    backgroundColor: "#eee",
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginBottom: 10,
    // position: "absolute",
    // bottom: 20,
  },
  inputField: {
    color: "#666",
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
