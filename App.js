import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider} from './store/context';
import {MainScreen, NameScreen, WelcomeScreen} from './screen/stackScreen';
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
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
