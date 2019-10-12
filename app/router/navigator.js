import {createStackNavigator, createAppContainer} from 'react-navigation';
import Advertising from './AdvertisingPage/Advertising';
import Home from './home/Home';
import Order from './order/Order';
import My from './my/My';
import Tab from './Tab';

const SignedOutNavigator = createStackNavigator(
  {
    AdvertisingPage: {
      screen: Advertising,
    },
    TabNavigator: {
      screen: Tab,
    },
    Home: {
      screen: Home,
    },
    Order: {
      screen: Order,
    },
    My: {
      screen: My,
    },
  },
  {
    headerMode: 'none',
    mode: 'card',
    navigationOptions: {
      headerTitle: null,
      header: null,
    },
  },
);
// const defaultGetStateForAction = SignedOutNavigator.router.getStateForAction;
// SignedOutNavigator.router.getStateForAction = (action, state) => {
//     if (state && action.type === NavigationActions.BACK) {
//         return null;
//     }
//     return defaultGetStateForAction(action, state)
// }
export default createAppContainer(SignedOutNavigator);
