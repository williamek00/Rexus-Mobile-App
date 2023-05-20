import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigators/mainStack";
import { ApolloProvider } from "@apollo/client";
import {client} from './config/index'


export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}
