import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { addContacts } from "../db/contacts";
import db from "../db/db";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const AddContacts = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [landlineNumber, setLandlineNumber] = useState("");
  const { data } = route.params;

  const navigation = useNavigation();

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!fullName) errors.fullName = "Name is required";
    if (!mobileNumber) errors.mobileNumber = "Mobile number is required";
    else if (
      parseFloat(mobileNumber) < 0 ||
      mobileNumber.length < 10 ||
      mobileNumber.length > 10
    )
      errors.mobileNumber = "Number must be 10 digit";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleAdd = () => {
    if (validateForm()) {
      const contact = {
        imageUri: image,
        fullName,
        phoneNumber: mobileNumber,
        landlineNumber,
        isFavourite: data ? 1 : 0,
      };

      addContacts(db, contact);
      setFullName("");
      setMobileNumber("");
      setLandlineNumber("");
      setImage(null);
      setErrors({});
      navigation.navigate("Contacts List");
    }
  };
  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setIsModalVisible(false);
    if (!result.canceled) {
      const imageObject = result.assets[0];
      const imageUri = imageObject.uri;
      setImage(imageUri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setIsModalVisible(false);

    if (!result.canceled) {
      const imageObject = result.assets[0]; // Access the first object in assets
      const imageUri = imageObject.uri; // Extract the URI from the object

      setImage(imageUri);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No permission granted</Text>;
  }
  return (
    <View style={styles.container}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.crossIcon}>
              <Entypo
                name="cross"
                size={24}
                color="black"
                onPress={() => setIsModalVisible(false)}
              />
            </View>
            <View style={styles.choicesContainer}>
              <View></View>
              <View style={styles.cameraContainer}>
                <Entypo
                  name="camera"
                  size={60}
                  color="#884dff"
                  onPress={takePhoto}
                />
                <Text style={{ fontWeight: "bold" }}>Camera</Text>
              </View>

              <View></View>
              <View></View>
              <View></View>
              <View style={styles.galleryContainer}>
                <MaterialIcons
                  name="add-a-photo"
                  size={60}
                  color="#884dff"
                  onPress={pickImage}
                />
                <Text style={{ fontWeight: "bold" }}>Gallery</Text>
              </View>

              <View></View>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.formContainer}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.8}
        >
          <View style={styles.imageUploader}>
            {image ? (
              <Image source={{ uri: image }} style={[styles.avatar]} />
            ) : (
              <MaterialIcons
                name="add-a-photo"
                size={40}
                color="purple"
              />
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.field}>
          <Octicons name="person" size={45} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Full name"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        {errors.fullName ? (
          <Text style={{ color: "red" }}>*{errors.fullName}</Text>
        ) : null}

        <View style={styles.field}>
          <Feather name="phone" size={35} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Mobile number"
            keyboardType="numeric"
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
        </View>
        {errors.mobileNumber ? (
          <Text style={{ color: "red" }}>*{errors.mobileNumber}</Text>
        ) : null}
        <View style={styles.field}>
          <Entypo name="landline" size={35} color="black" />
          <TextInput
            style={styles.input}
            placeholder="Landline number"
            keyboardType="numeric"
            value={landlineNumber}
            onChangeText={setLandlineNumber}
          />
          {errors.landlineNumber ? (
            <Text style={{ color: "red" }}>{errors.landlineNumber}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAdd} color="#eee6ff">
            <Text style={styles.buttonTitle}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  formContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#005ce6",
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    borderColor: "black",
    marginBottom: 10,
    width: 310,
    marginLeft: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#884dff",
    padding: 10,
    width: 100,
    backgroundColor: "#884dff",
  },
  buttonTitle: {
    color: "white",
    fontWeight: "bold",
  },
  imageUploader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
    width: 100,
    height: 100,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: "#884dff",
    backgroundColor: "#eee6ff", 
    elevation: 3,
  },
  error: {
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    height: "40%",
  },
  crossIcon: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  choicesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "20%",
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  galleryContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddContacts;
