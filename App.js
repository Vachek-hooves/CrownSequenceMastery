import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider} from './store/context';
import {
  AboutScreen,
  CustomizeScreen,
  MainScreen,
  NameScreen,
  ResultScreen,
  SettingsScreen,
  WelcomeScreen,
} from './screen/stackScreen';
import CrownGameScreen from './screen/stackScreen/CrownGameScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom',
            animationDuration: 1000,
          }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="NameScreen" component={NameScreen} />
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="CrownGameScreen" component={CrownGameScreen} />
          <Stack.Screen name="ResultScreen" component={ResultScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="CustomizeScreen" component={CustomizeScreen} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
