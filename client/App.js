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

import Navigator from "./routes/listStack";

import List from "./screens/list";

export default function App() {
  return <Navigator />;
}
