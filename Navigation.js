import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tournament} from './screen/stackScreen';
import Progress from './screen/tabScreen/Progress';
import Realm from './screen/tabScreen/Realm';
import Sequance from './screen/tabScreen/Sequance';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFC600',
        tabBarBackground: () => (
          <LinearGradient
            colors={['#FCF8EA', '#FFEA9E']}
            style={StyleSheet.absoluteFill}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          />
        ),
      }}>
      <Tab.Screen
        name="Realm"
        component={Realm}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              My Realm
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/image/tabBar/realm.png')}
              style={[styles.tabIcon, focused && styles.tabIconFocused]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Sequance"
        component={Sequance}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Sequences
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/image/tabBar/sequences.png')}
              style={[styles.tabIcon, focused && styles.tabIconFocused]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={Progress}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Progress
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/image/tabBar/progress.png')}
              style={[styles.tabIcon, focused && styles.tabIconFocused]}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tournament"
        component={Tournament}
        options={{
          tabBarLabel: ({focused}) => (
            <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
              Tournament
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <Image
              source={require('./assets/image/tabBar/tournament.png')}
              style={[styles.tabIcon, focused && styles.tabIconFocused]}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    borderTopWidth: 0,
    elevation: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabIcon: {
    width: 24,
    height: 24,
    tintColor: '#000000',
    opacity: 0.5,
  },
  tabIconFocused: {
    opacity: 1,
    tintColor: '#FFC600',
  },
  tabLabel: {
    fontSize: 12,
    color: '#000000',
    opacity: 0.5,
    marginTop: 4,
  },
  tabLabelFocused: {
    opacity: 1,
    fontWeight: '600',
    color: '#FFC600',
  },
});

export default Navigation;
