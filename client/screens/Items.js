import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import Item from "../components/Item";
const Items = () => {
  const [items, setItems] = useState([]);

  /* All items */
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

  return (
    <View style={styles.container}>
      {items.map((item, index) => {
        return (
          <View key={index}>
            <Item id={item._id} name={item.name} color={item.color} />
          </View>
        );
      })}
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
  },
});
