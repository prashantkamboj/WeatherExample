import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteStackParamList} from './types';
import ScreenHome from '../Screens/ScreenHome/ScreenHome';
import ScreenHistory from '../Screens/ScreenHistory/ScreenHistory';
import {NavigationContainer} from '@react-navigation/native';

const NavigationStack = createNativeStackNavigator<RouteStackParamList>();

function Route() {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator
        initialRouteName="ScreenHome"
        screenOptions={{headerShown: false}}>
        <NavigationStack.Screen name="ScreenHome" component={ScreenHome} />
        <NavigationStack.Screen
          name="ScreenHistory"
          component={ScreenHistory}
        />
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}
export default Route;
