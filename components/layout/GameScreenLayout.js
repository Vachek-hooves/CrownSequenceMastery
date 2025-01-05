import {StyleSheet, View} from 'react-native';

const GameScreenLayout = ({children}) => {
  return (
    <View style={styles.container} start={{x: 0, y: 0}} end={{x: 1, y: 1}}>
      {children}
    </View>
  );
};

export default GameScreenLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
});
