import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CrownIcon = () => {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,1)', '#FCF8EA' + 40]}
      style={[styles.homeButtonGradient, styles.homeButtonShadow]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity
        disabled
        style={styles.homeButton}
        // onPress={() => navigation.goBack()}
      >
        <Image
          source={require('../../assets/image/icons/crownIcon.png')}
          style={styles.homeIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CrownIcon;

const styles = StyleSheet.create({
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // for Android
  },
  homeButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIcon: {
    width: 24,
    height: 24,
  },
});
