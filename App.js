import React, { useEffect, useState } from "react";
import messaging from '@react-native-firebase/messaging';

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from "./src/redux/reducers";

import MessagingService from "./src/services/MessagingService";
import NavigatorPage from "./src/pages/NavigatorPage";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {

  useEffect(() => {

    MessagingService()

  }, []);

  return <Provider store = {store}>
    <NavigatorPage></NavigatorPage>
  </Provider>
}

export default App