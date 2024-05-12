import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from '@expo/vector-icons';

const ContactsCard = ({ item }) => {
  const navigation = useNavigation();
  const goToContactInfo = () => {
    navigation.navigate("Contact Info", { contact: item });
  };
  return (
    <TouchableOpacity onPress={goToContactInfo} activeOpacity={0.978}>
      <View style={styles.card}>
        <View style={styles.infoContainer}>
          <View style={styles.image}>
            <Image
              source={{
                uri: item.imageUri
                  ? item.imageUri
                  : `https://ui-avatars.com/api/?name=${item.fullName}&size=20&background=ffffff&color=003380&rounded=true`,
              }}
              style={styles.avatar}
              defaultSource={{
                uri: `https://ui-avatars.com/api/?name=${item.fullName.charAt(
                  0
                )}&size=200&background=ffffff&color=003380&rounded=true`,
              }}
            />
          </View>
          <Text style={{ fontWeight: "bold", fontSize: 20, color: "#884dff" }}>
            {item.fullName}
          </Text>
        </View>
        <View>
        <FontAwesome name="arrow-right" size={24} color="#884dff" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    margin: 5,
    borderWidth: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth:1,
    borderRadius:30,
    borderColor:"#884dff",
   
  },
  image: {
    marginLeft: 30,
    marginRight: 30,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 75,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  leftSwipe: {
    backgroundColor: "red",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  rightSwipe: {
    backgroundColor: "#1a75ff",
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ContactsCard;
