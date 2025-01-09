import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {ContextProvider} from './store/context';
import {
  AboutScreen,
  CustomizeScreen,
  Tournament,
  NameScreen,
  ResultScreen,
  SelectBackgroundScreen,
  SelectCrownScreen,
  SettingsScreen,
  WelcomeScreen,
} from './screen/stackScreen';
import {useState, useEffect} from 'react';
import CrownGameScreen from './screen/stackScreen/CrownGameScreen';

import {
  pauseBackgroundMusic,
  playBackgroundMusic,
  setupPlayer,
} from './components/Sound/SetUp';
import {AppState} from 'react-native';
import {useAppContext} from './store/context';
import Navigation from './Navigation';
import CreateSequance from './screen/stackScreen/CreateSequance';
import SequenceDetails from './screen/stackScreen/SequenceDetails';
import EditSequence from './screen/stackScreen/EditSequence';

const Stack = createNativeStackNavigator();

// const App = () => {
//   const {isMusicEnable} = useAppContext();
//   console.log(isMusicEnable);
//   const [isPlayMusic, setIsPlayMusic] = useState(false);

//   useEffect(() => {
//     const subscription = AppState.addEventListener('change', nextAppState => {
//       if (nextAppState === 'active' && isPlayMusic && isMusicEnable) {
//         playBackgroundMusic();
//       } else if (nextAppState === 'inactive' || nextAppState === 'background') {
//         pauseBackgroundMusic();
//       }
//     });

//     const initMusic = async () => {
//       await setupPlayer();
//       if (isMusicEnable) {
//         await playBackgroundMusic();
//         setIsPlayMusic(true);
//       }
//     };
//     initMusic();

//     return () => {
//       subscription.remove();
//       pauseBackgroundMusic();
//     };
//   }, [isMusicEnable]);

const AppNavigator = () => {
  const {isMusicEnable} = useAppContext();
  const [isPlayMusic, setIsPlayMusic] = useState(false);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isPlayMusic && isMusicEnable) {
        playBackgroundMusic();
      } else if (nextAppState === 'inactive' || nextAppState === 'background') {
        pauseBackgroundMusic();
      }
    });

    const initMusic = async () => {
      await setupPlayer();
      if (isMusicEnable) {
        await playBackgroundMusic();
        setIsPlayMusic(true);
      }
    };
    initMusic();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, [isMusicEnable]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        animationDuration: 1000,
      }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Navigation" component={Navigation} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="Tournament" component={Tournament} />
      <Stack.Screen name="CrownGameScreen" component={CrownGameScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="CustomizeScreen" component={CustomizeScreen} />
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
      <Stack.Screen
        name="SelectBackgroundScreen"
        component={SelectBackgroundScreen}
      />
      <Stack.Screen name="SelectCrownScreen" component={SelectCrownScreen} />
      <Stack.Screen name="CreateSequance" component={CreateSequance} />
      <Stack.Screen name="SequenceDetails" component={SequenceDetails} />
      <Stack.Screen name='EditSequence' component={EditSequence}/>
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
};
export default App;
