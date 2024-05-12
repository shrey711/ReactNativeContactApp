import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactsList from "../screens/ContactsList";
import AddContacts from "../screens/AddContacts";
import FavouriteIcon from "./FavouriteIcon";
import SearchBar from "./SearchBar";
import EditContact from "../screens/EditContact";
import ContactInfo from "../screens/ContactInfo";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#1a75ff",
        headerStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Stack.Screen
        name="Contacts List"
        component={ContactsList}
        options={{
          headerTitle: () => <SearchBar />,
        }}
      />

      <Stack.Screen
        name="Add Contacts"
        component={AddContacts}
        options={{
          headerRight: () => {
            return <FavouriteIcon />;
          },
        }}
      />
      <Stack.Screen name="Edit Contact" component={EditContact} options={{
       
      }} />
      <Stack.Screen name="Contact Info" component={ContactInfo}
      
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
