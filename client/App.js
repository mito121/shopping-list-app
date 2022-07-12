import React, { useState, useEffect } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, View } from "react-native";
import ItemInputField from "./components/ItemInputField";
import Item from "./components/Item";
import Color from "./components/Color";

export default function App() {
  const [items, setItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentlyAddingItem, setCurrentlyAddingItem] = useState(false);
  /* Items */
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
        color: selectedColor || "#eee",
        listId: "1",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res.item) return console.log("Error adding new item.");
        setItems([...items, res.item]);
      });
    setSelectedColor(null);
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
        setItems(items.filter((item) => item._id != res.id));
      });
  };

  const addingItem = (bool) => {
    setCurrentlyAddingItem(bool);
  };

  /* Colors */

  const getColors = () => {
    fetch("http://10.0.2.2:3000/colors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setColors(res);
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) getColors();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const selectColor = (id, color) => {
    console.log(id, color);
    if (selectedColor === color) return setSelectedColor("");
    setSelectedColor(color);
  };

  const suggestionWindow = () => {
    if (!currentlyAddingItem) return;
    return (
      <View style={styles.focusedWrapper}>
        {/* <View style={styles.itemSuggestions}>
          <Text>Existing items</Text>
        </View> */}
        <View style={styles.newItem}>
          <Text>Vælg farve</Text>
          <View style={styles.colorContainer}>
            {colors.map((color) => {
              return (
                <View key={color._id}>
                  <Color
                    selected={selectedColor === color.color ? true : false}
                    id={color._id}
                    color={color.color}
                    selectColor={() => selectColor(color._id, color.color)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Indkøbsliste</Text>

      <ItemInputField addItem={addItem} addingItem={addingItem} />
      {suggestionWindow()}
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
    // backgroundColor: "#1E1A3C",
  },
  heading: {
    // color: "#fff",
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
  focusedWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    height: "50%",
  },
  colorContainer: {
    marginTop: 15,
    flexDirection: "row",
    flex: 1,
  },
});
