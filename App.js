import { NavigationContainer } from "@react-navigation/native";

import { StyleSheet, StatusBar } from "react-native";

import { useEffect } from "react";
import db, { initDatabase } from "./db/db";

import Favourites from "./screens/Favourites";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import StackNavigator from "./components/StackNavigator";

const Drawer = createDrawerNavigator();

const App = () => {
  useEffect(() => {
    const loadData = async () => {
      try {
        await initDatabase(db);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);
  return (
    <>
      <StatusBar backgroundColor="#884dff" />
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen
            name="Home"
            component={StackNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="Favourites"
            component={Favourites}
            options={{
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default gestureHandlerRootHOC(App);
