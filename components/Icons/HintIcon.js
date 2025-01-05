import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HintIcon = ({onPress, hints, disabled}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={styles.container}>
      <LinearGradient
        colors={['#FFEA9E', '#FCF8EA']}
        style={[styles.homeButtonGradient, styles.homeButtonShadow]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.homeButton}>
          <Image
            source={require('../../assets/image/icons/lampIcon.png')}
            style={styles.homeIcon}
          />
        </View>
      </LinearGradient>
      <LinearGradient
        colors={['#FFEA9E', '#FCF8EA']}
        style={styles.hintLinearContainer}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.iconCircle}>
          <Text style={styles.hintCount}>{hints}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HintIcon;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  hintLinearContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    left: -10,
    borderTopEndRadius: 15,
    borderBottomRightRadius: 15,
  },
  homeButtonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
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
  hintCount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  iconCircle: {
    borderRadius: 35,
    backgroundColor: 'rgba(252, 248, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
