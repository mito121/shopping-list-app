import React, { useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemInputField from "./components/ItemInputField";
import Item from "./components/Item";

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    if (item == null) return;
    setItems([...items, item]);
    Keyboard.dismiss();
  };

  const deleteItem = (deleteIndex) => {
    setItems(items.filter((value, index) => index != deleteIndex));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Indkøbsliste</Text>
      <ItemInputField addItem={addItem} />
      <ScrollView style={styles.scrollView}>
        {items.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <Item
                index={index + 1}
                item={item}
                color={"#fff"}
                deleteItem={() => deleteItem(index)}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E1A3C",
  },
  heading: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "600",
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollView: {
    marginBottom: 70,
  },
  itemContainer: {
    marginTop: 20,
  },
});
