import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/core";
import {
  query,
  collection,
  orderBy,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

const MessageScreen = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const { matchDetails } = params;
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  React.useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };
  return (
    <SafeAreaView className="flex-1">
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavoir={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            inverted={-1}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId == user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
        <View className="bg-white flex-row justify-between items-center border-t border-gray-200 px-5 py-2">
          <TextInput
            className="h-10 text-lg"
            placeholder="Send Message..."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />
          <Button title="Send" color="#ff5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;
