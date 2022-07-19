import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native";
import Home from "./screens/home";
import One from "./screens/one";
import Two from "./screens/two";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <StackNavigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="One" component={One}></Stack.Screen>
        <Stack.Screen name="Two" component={Two}></Stack.Screen>
      </Stack.Group>
    </StackNavigator>
  );
};

export default StackNavigator;
