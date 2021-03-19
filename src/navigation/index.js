import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/Welcome';
import AdminScreen from '../screens/Admin';

const Navigator = createStackNavigator(
  {
    Welcome: WelcomeScreen,
    Admin: AdminScreen,
  },
  { headerMode: 'none' }
);

export default createAppContainer(Navigator);
