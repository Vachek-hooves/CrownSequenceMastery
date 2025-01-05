import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';

const HintIcon = ({useHint, hints}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LinearGradient
        colors={['#FFEA9E', '#FCF8EA']}
        style={[styles.homeButtonGradient, styles.homeButtonShadow]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <TouchableOpacity style={styles.homeButton} onPress={useHint}>
          <Image
            source={require('../../assets/image/icons/lampIcon.png')}
            style={styles.homeIcon}
          />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient
        colors={['#FFEA9E', '#FCF8EA']}
        style={styles.hintLinearContainer}
        // style={[styles.homeButtonGradient, styles.homeButtonShadow]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.iconCircle}>
          <Text style={styles.hintCount}>{hints}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HintIcon;

const styles = StyleSheet.create({
  homeButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:1
  },
  hintLinearContainer: {
    width: 30,
    height: 30,
    // borderRadius: 15,
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
  hintCount: {
    // position: 'absolute',
    // top: 5,
    // left: 5,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    // color: 'white',
  },
  iconCircle: {
    // width: 60,
    // height: 60,
    borderRadius: 35,
    backgroundColor: 'rgba(252, 248, 234, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
