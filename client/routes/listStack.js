import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "@react-navigation/native";
import List from "../screens/list";

const screens = {
  List: {
    screen: List,
  },
};

const ListStack = createStackNavigator(screens);

export default createAppContainer(ListStack);
