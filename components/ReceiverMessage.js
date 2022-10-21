import React from "react";
import { View, Text, Image } from "react-native";

const RecieverMessage = ({ message }) => {
  return (
    <View className="mr-20 justify-start items-center flex-row mb-2">
      <View className="ml-1">
        <Image
          source={{ uri: message.photoURL }}
          className="h-12 w-12 rounded-full"
        />
      </View>
      <View className="bg-red-400 rounded-lg rounded-tl-none mt-8 px-2 py-2 ml-1">
        <Text className="text-white">{message.message}</Text>
      </View>
    </View>
  );
};

export default RecieverMessage;
