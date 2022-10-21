import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import useAuth from "../hooks/useAuth";

const auth = getAuth();

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setvalidationMessage] = useState("");

  async function login() {
    if (email === "" || password === "") {
      setvalidationMessage("required filled missing");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setvalidationMessage(error.message);
    }
  }

  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1 justify-center items-center pb-32"
        source={require("../assets/images/gradientRed.png")}
      >
        <Image
          source={require("../assets/images/tinderWhite.png")}
          className="h-12 w-12"
        />

        {/* Input Forms */}
        <View className="mr-28">
          <TextInput
            placeholder="Email"
            placeholderTextColor="white"
            className="mt-8"
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="white"
            className="mt-4"
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          {<Text className="mt-2 text-white">{validationMessage}</Text>}
        </View>

        {/* Log In Button */}
        <View className="flex-row mt-4">
          <TouchableOpacity
            className="w-24 bg-white p-4 rounded-2xl justify-center items-center mt-2"
            onPress={login}
          >
            <Text className="text-black font-bold">Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={signInWithGoogle} className="mt-2 ml-8">
            <Image
              source={require("../assets/images/googleLogo.png")}
              className="w-12 h-12"
            />
          </TouchableOpacity>
        </View>

        {/* Sign Up Button Subtext */}
        <View>
          <Text className="mt-4 text-white">
            Don't have an account yet?
            <TouchableOpacity onPress={() => navigation.navigate("Sign Up")}>
              <Text className="text-white font-bold">Sign up here</Text>
            </TouchableOpacity>
          </Text>
        </View>

        {/* Sign In With Google Button */}
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
