import { View, Text, StyleSheet, Image, Linking } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const ContactInfo = ({ route }) => {
  const { contact } = route.params;
  const handleCall = () => {
    Linking.openURL(`tel:${contact.phoneNumber}`);
  };
  const handleText = () => {
    Linking.openURL(`sms:${contact.phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.profile}>
          <Image
            source={{
              uri: contact.imageUri
                ? contact.imageUri
                : `https://ui-avatars.com/api/?name=${contact.fullName}&size=20&background=ffffff&color=003380&rounded=true`,
            }}
            style={[styles.avatar]}
          />
        </View>
        <View>
          <Text style={styles.name}>{contact.fullName}</Text>
        </View>
      </View>

      <View style={styles.iconContainer}>
        <View style={styles.iconAndNameContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleCall}>
            <View style={styles.icons}>
              <Ionicons name="call-outline" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={{ fontWeight: "500" }}>Call</Text>
        </View>
        <View style={styles.iconAndNameContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleText}>
            <View style={styles.icons}>
              <AntDesign name="message1" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={{ fontWeight: "500" }}>Text</Text>
        </View>

        <View style={styles.iconAndNameContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={handleCall}>
            <View style={styles.icons}>
              <Feather name="video" size={30} color="white" />
            </View>
          </TouchableOpacity>

          <Text style={{ fontWeight: "500" }}>Video</Text>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <Text style={{ fontWeight: "bold", fontSize: 20, margin: "1%" ,color:"white"}}>
          Contact info
        </Text>
        <View style={styles.mobileNumberContainer}>
          <Ionicons name="call-outline" size={30} color="white" />
          <View>
            <Text style={{ fontSize: 20 ,color:"white"}}>+91 {contact.phoneNumber}</Text>
            <Text style={{ fontSize: 15,color:"white" }}>Mobile</Text>
          </View>

          <View></View>
          <View></View>
        </View>
        <View style={styles.landline}>
          {contact.landlineNumber ? (
            <Entypo name="landline" size={24} color="white" />
          ) : null}

          <View>
            {contact.landlineNumber ? (
              <Text style={{ fontSize: 20 ,color:"white"}}>+91 {contact.landlineNumber}</Text>
            ) : null}
            {contact.landlineNumber ? (
              <Text style={{ fontSize: 15,color:"white" }}>Landline</Text>
            ) : null}
          </View>

          <View></View>
          <View></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#884dff",
    backgroundColor: "",
    elevation: 3,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  infoContainer: {
    flex: 0.5,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    margin: 5,
    marginBottom: 0,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icons: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#884dff",

    borderRadius: 75,
    padding: 18,
    elevation: 5,
  },

  iconAndNameContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  contactInfo: {
    flex: 0.5,
    

    backgroundColor: "#884dff",
    margin: "5%",
    borderRadius: 15,
    padding: 20,
    elevation: 3,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
  landline: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
  },
});
export default ContactInfo;
