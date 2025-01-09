import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tournament} from './screen/stackScreen';
import Progress from './screen/tabScreen/Progress';
import Realm from './screen/tabScreen/Realm';
import Sequance from './screen/tabScreen/Sequance';
const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Realm" component={Realm} />
      <Tab.Screen name="Sequance" component={Sequance} />
      <Tab.Screen name="Progress" component={Progress} />
      <Tab.Screen name="Tournament" component={Tournament} />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
