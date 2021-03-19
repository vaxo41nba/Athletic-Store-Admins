import React from 'react';
import * as firebase from 'firebase';
import { LogBox } from 'react-native';

import Navigator from './src/navigation';
import ApiKeys from './src/constants/ApiKeys';

export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  if (!firebase.apps.length) {
    firebase.initializeApp(ApiKeys.FireBaseConfig);
  }
  return <Navigator />;
}
