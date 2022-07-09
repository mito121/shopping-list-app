import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemInputField from "./components/ItemInputField";
import Item from "./components/Item";

export default function App() {
  const [items, setItems] = useState([]);

  const getItems = () => {
    fetch("http://10.0.2.2:3000/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) getItems();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const addItem = (item) => {
    if (item == null) return;
    fetch("http://10.0.2.2:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify({
        name: item,
        color: "#123",
        listId: "1",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.item) return console.log("Error adding new item.");
        setItems([...items, res.item]);
      });
    Keyboard.dismiss();
  };

  const deleteItem = (id) => {
    fetch(`http://10.0.2.2:3000/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("delete res", res);
        setItems(items.filter((item) => item._id != res.id));
      });
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
                id={item._id}
                name={item.name}
                color={item.color}
                deleteItem={() => deleteItem(item._id)}
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
