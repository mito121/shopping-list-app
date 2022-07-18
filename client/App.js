import React, { useState, useEffect } from "react";
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import ItemInputField from "./components/ItemInputField";
import Item from "./components/Item";
import ActiveItem from "./components/ActiveItem";
import RemovedItem from "./components/RemovedItem";
import SuggestedItem from "./components/SuggestedItem";
import Color from "./components/Color";

export default function App() {
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [removedItems, setRemovedItems] = useState([]);
  const [suggestedItems, setSuggestedItems] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [currentlyAddingItem, setCurrentlyAddingItem] = useState(false);
  const [itemSearch, setItemSearch] = useState("");
  /* Active items */
  const getItems = () => {
    fetch("http://10.0.2.2:3000/active-items", {
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
    fetch("http://10.0.2.2:3000/active-items", {
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
        if (res.firstTimeItem) setAllItems([...allItems, res.item]);
        setItems([...items, res.item]);
      });
    setSelectedColor(null);
    Keyboard.dismiss();
  };

  const removeItem = (item) => {
    fetch(`http://10.0.2.2:3000/active-items/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setItems(items.filter((item) => item._id != res.id));

        /* Add item to removed items */
        fetch(`http://10.0.2.2:3000/removed-items/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify(item),
        })
          .then((res) => res.json())
          .then((res) => {
            /* add to removed items */
            setRemovedItems([...removedItems, res.item]);
          });
      });
  };

  const itemInputVal = (val) => {
    setItemSearch(val);
  };

  useEffect(() => {
    const results = allItems.filter((item) => item.name.includes(itemSearch));
    setSuggestedItems(results);
  }, [itemSearch]);

  const addingItem = (bool) => {
    setItemSearch("");
    setSelectedColor("");
    setCurrentlyAddingItem(bool);
  };

  /* Removed items */
  /* Items */
  const getRemovedItems = () => {
    fetch("http://10.0.2.2:3000/removed-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRemovedItems(res);
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) getRemovedItems();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const deleteRemovedItem = (item) => {
    fetch(`http://10.0.2.2:3000/removed-items/${item._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setRemovedItems(removedItems.filter((item) => item._id != res.id));
      });
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

  const selectColor = (color) => {
    if (selectedColor === color) return setSelectedColor("");
    setSelectedColor(color);
  };

  const clickSuggestedItem = (item) => {
    fetch("http://10.0.2.2:3000/active-items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((res) => {
        addingItem(false);

        if (!res.item) return console.log("Error adding new item.");
        if (res.firstTimeItem) setAllItems([...allItems, res.item]);
        setItems([...items, res.item]);
      });
  };

  const itemSuggestions = () => {
    if (itemSearch.length <= 0) return;

    if (!suggestedItems.length > 0)
      return (
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
                    selectColor={() => selectColor(color.color)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      );

    if (suggestedItems.length > 0)
      return (
        <View style={styles.itemSuggestions}>
          {suggestedItems.map((item, index) => {
            return (
              <SuggestedItem
                key={index}
                id={item.id}
                name={item.name}
                color={item.color}
                press={() => clickSuggestedItem(item)}
              />
            );
          })}
        </View>
      );
  };

  const suggestionWindow = () => {
    if (!currentlyAddingItem) return;

    return (
      <TouchableWithoutFeedback onPress={() => addingItem(false)}>
        <View style={styles.focusedWrapper}>
          <ItemInputField
            addItem={addItem}
            addingItem={addingItem}
            inputChange={itemInputVal}
          />

          {/* Item suggestions */}
          {itemSuggestions()}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /* All items */
  const getAllItems = () => {
    fetch("http://10.0.2.2:3000/items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setAllItems(res);
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isSubscribed) getAllItems();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Indkøbsliste</Text>
      {/* <ItemInputField addItem={addItem} addingItem={addingItem} /> */}
      {/* <Button
        title="+ Ny vare"
        style={styles.newItemButton}
        onPress={() => addingItem(true)}
      /> */}

      <TouchableOpacity onPress={() => addingItem(true)}>
        <View style={styles.newItemButton}>
          <Text>+ Ny vare</Text>
        </View>
      </TouchableOpacity>

      {suggestionWindow()}
      <ScrollView style={styles.scrollView}>
        {/* Active items */}
        {items.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <ActiveItem
                id={item._id}
                name={item.name}
                color={item.color}
                removeItem={() => removeItem(item)}
              />
            </View>
          );
        })}

        {/* Removed items */}
        <Text>Removed items</Text>
        {removedItems.map((item, index) => {
          return (
            <View key={index} style={styles.itemContainer}>
              <RemovedItem
                id={item._id}
                name={item.name}
                color={item.color}
                deleteRemovedItem={() => deleteRemovedItem(item)}
              />
            </View>
          );
        })}

        {/* All items */}
        <Text>All items</Text>
        {allItems.map((item, index) => {
          return (
            <View key={index}>
              <Item id={item._id} name={item.name} color={item.color} />
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
    position: "relative",
    zIndex: 0,
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
    paddingTop: 95,
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255,255,255,.95)",
    zIndex: 1,
  },
  colorContainer: {
    marginTop: 15,
    flexDirection: "row",
    flex: 1,
  },
  newItemButton: {
    borderColor: "#fff",
    backgroundColor: "#eee",
    borderWidth: 1,
    borderRadius: 12,
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: "#666",
  },
  itemSuggestions: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
