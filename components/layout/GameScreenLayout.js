import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GameScreenLayout = ({children}) => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.9)']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      {children}
    </LinearGradient>
  );
};

export default GameScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(252, 248, 234, 0.5)',
  },
});
