import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import db from "../db/db";
import { getContacts, deleteContact } from "../db/contacts";
import ContactsCard from "../components/ContactsCard";
import { initDatabase } from "../db/db";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome } from "@expo/vector-icons";

const ContactsList = ({ route }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contacts, setContacts] = useState([]);
  const { data } = route.params || {};

  const navigation = useNavigation();

  useEffect(() => {
    setSearchTerm(data);
  }, [data]);

  const loadData = async () => {
    try {
      await initDatabase(db);
      const contacts = await getContacts(db);
      const sortedContacts = contacts.sort((a, b) =>
        a.fullName.localeCompare(b.fullName)
      );
      setContacts(sortedContacts);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filteredContacts = contacts.filter((contact) =>
        contact.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setContacts(filteredContacts);
    } else {
      loadData();
    }
  }, [searchTerm]);

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  const goToAddContacts = () => {
    navigation.navigate("Add Contacts", { data: "" });
  };

  const handleDelete = async (item) => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete ${item.fullName}?`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteContactFromDB(item) },
      ]
    );
  };

  const deleteContactFromDB = async (item) => {
    try {
      await deleteContact(db, item.id);
      // Update the state or reload the data after deletion
      loadData();
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate("Edit Contact", { contact: item });
  };

  const renderHiddenItem = ({ item }) => (
    <View style={[styles.rowBack]}>
      <TouchableOpacity
        style={[styles.deleteContainer]}
        onPress={() => handleDelete(item)}
      >
        <FontAwesome name="trash" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.editContainer]}
        onPress={() => handleEdit(item)}
      >
        <AntDesign name="edit" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        data={contacts}
        renderItem={({ item }) => {
          return <ContactsCard key={item.id} item={item} />;
        }}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={190} // Width of the left action buttons
        keyExtractor={(item) => item.id}
      />
      <View style={styles.addContainer}>
        <View style={styles.addIcon}>
          <TouchableOpacity onPress={goToAddContacts} activeOpacity={0.6}>
            <AntDesign name="pluscircle" size={60} color="#b31aff" />
          </TouchableOpacity>
        </View>
      </View>
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
  addContainer: {
    flex: 1,
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginVertical: 40,
    marginHorizontal: 30,
    position: "absolute",
    bottom: -10,
    right: 0,
  },
  deleteContainer: {
    backgroundColor: "red",
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    marginRight: 2,
    borderRadius: 10,
  },
  editContainer: {
    backgroundColor: "#1a75ff",
    width: 90,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    borderRadius: 10,
  },

  rowBack: {
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "2%",
  },
});

export default ContactsList;
