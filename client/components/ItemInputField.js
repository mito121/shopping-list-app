import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
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
        placeholder={"Add an item"}
        placeholderTextColor={"#fff"}
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
    backgroundColor: "#3E3364",
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
    color: "#fff",
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
