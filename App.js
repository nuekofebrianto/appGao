import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from "react";

import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { rootReducer } from "./src/redux/reducers";

import { faIcon } from "./src/components/CusIcon";
import NavigatorPage from './src/pages/NavigatorPage';
import MessagingService from "./src/services/MessagingService";

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const App = () => {

  useEffect(() => {

    faIcon.add
    MessagingService()

  }, []);

  return <Provider store={store}>
    <NavigatorPage></NavigatorPage>
  </Provider>
}

export default App