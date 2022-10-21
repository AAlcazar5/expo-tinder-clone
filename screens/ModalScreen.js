import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const ModalScreen = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [age, setAge] = useState(null);
  const navigation = useNavigation();
  const incompleteForm = !image || !occupation || !age;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: user.displayName,
      photoURL: image,
      job: occupation,
      age: age,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        navigation.navigate("HomeScreen");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View className="flex-1 items-center pt-1">
      <Image
        className="h-20 w-full"
        resizeMode="contain"
        source={{ uri: "https://links.papareact.com/2pf" }}
      />
      <Text className="text-xl text-gray-500 p-2 mt-2 mb-7 font-bold">
        {" "}
        Hey {user.displayName} !
      </Text>

      <Text className="text-center p-4 font-bold text-red-400">
        Picture 1 : Profile Photo
      </Text>
      <TextInput
        value={image}
        onChangeText={(text) => setImage(text)}
        className="text-center text-xl pb-3"
        placeholder="Add a Profile Photo"
      />
      <Text className="text-center p-4 font-bold text-red-400">
        Picture 2 : Profession
      </Text>
      <TextInput
        value={occupation}
        onChangeText={(text) => setOccupation(text)}
        className="text-center text-xl pb-3"
        placeholder="Add your Occupation"
      />
      <Text className="text-center p-4 font-bold text-red-400">
        Picture 3 : Hobby
      </Text>
      <TextInput
        value={age}
        onChangeText={(text) => setAge(text)}
        className="text-center text-xl pb-3"
        placeholder="Add your Hobby"
        keyboardType="numeric"
      />

      <TouchableOpacity
        disabled={incompleteForm}
        className={`{" w-64 p-3 mt-20 rounded-xl bottom-0 "}, ${
          incompleteForm ? " bg-gray-400" : "bg-red-400"
        }`}
        onPress={updateUserProfile}
      >
        <Text className="text-center text-white text-xl ">
          Save Your Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalScreen;
