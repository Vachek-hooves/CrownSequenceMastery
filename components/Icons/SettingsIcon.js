import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const SettingsIcon = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
    colors={['#FF6B6B', '#4ECDC4']}
      style={[styles.homeButtonGradient, styles.homeButtonShadow]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('SettingsScreen')}>
        <Image
          source={require('../../assets/image/icons/settingsIcon.png')}
          style={styles.homeIcon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default SettingsIcon;

const styles = StyleSheet.create({
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 30,
    // marginTop: 30,
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
