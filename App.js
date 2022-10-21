import React from "react";
import StackNavigator from "./StackNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./hooks/useAuth";
import { TailwindProvider } from "tailwindcss-react-native";

export default function App() {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}
