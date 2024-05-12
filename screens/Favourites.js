import { View, Text, StyleSheet, FlatList, TextInput } from "react-native";
import React from "react";

import { useState, useEffect } from "react";
import db, { initDatabase } from "../db/db";
import { getContacts } from "../db/contacts";
import ContactsCard from "../components/ContactsCard";
import { Octicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  DrawerActions,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
const Favourites = () => {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === "") {
      loadData(); // Load all favourite contacts if search text is empty
    } else {
      const filteredContacts = contacts.filter((contact) =>
        contact.fullName.toLowerCase().includes(text.toLowerCase())
      );
      setContacts(filteredContacts);
    }
  };

  const loadData = async () => {
    try {
      await initDatabase(db);
      const allContacts = await getContacts(db);
      const favouriteContacts = allContacts.filter(
        (contact) => contact.isFavourite === 1
      );
      const sortedContacts = favouriteContacts.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
      setContacts(sortedContacts);
      //console.log("Favourite Contacts loaded:", sortedContacts);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const handleThreeBarPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleThreeBarPress}>
          <Octicons
            name="three-bars"
            size={24}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.searchContainer}>
          <TextInput
            value={searchTerm}
            onChangeText={handleSearch}
            style={styles.searchInput}
            placeholder="Search "
            placeholderTextColor="black"
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginTop: "5%",
          marginLeft: "5%",
        }}
      >
        Favourites
      </Text>
      <FlatList
        data={contacts}
        renderItem={({ item }) => {
          return <ContactsCard key={item.id} item={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    position: "relative",
  },
  header: {
    height: 70,
    backgroundColor: "white",
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    color: "black",
    borderWidth: 2,
    borderColor: "#1a75ff",
    borderRadius: 15,
    padding: 10,
    margin: -5,
    marginLeft: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 25,
  },
  icon: {
    marginLeft: 15,
  },
});

export default Favourites;
