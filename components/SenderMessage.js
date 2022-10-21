import React from "react";
import { View, Text, Image } from "react-native";

const SenderMessage = ({ message }) => {
  return (
    <View className="mr-20 justify-start items-center flex-row-reverse mb-2">
      <View className="mr-1">
        <Image
          source={{ uri: message.photoURL }}
          className="h-12 w-12 rounded-full"
        />
      </View>
      <View className="bg-purple-600 rounded-lg rounded-tr-none mt-8 px-2 py-2 mr-1">
        <Text className="text-white">{message.message}</Text>
      </View>
    </View>
  );
};

export default SenderMessage;
