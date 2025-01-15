import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CustomButton = ({title, onPress, variant = 'secondary'}) => {
  const isPlayButton = variant === 'primary';

  return (
    <LinearGradient
      colors={
        isPlayButton
          // ? ['#FFEA9E', '#FCF8EA']
          ? ['#FF6B6B', '#4ECDC4']
          : ['rgba(36, 36, 36, 1)', 'rgba(36, 36, 36, 1)']
      }
      style={[styles.button, isPlayButton && styles.buttonShadow]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity onPress={onPress} style={styles.touchable}>
        <Text
          style={[styles.buttonText, isPlayButton && styles.primaryButtonText]}>
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 10,
  },
  buttonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 5,
  },
  touchable: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
  },
  primaryButtonText: {
    color: '#000',
  },
});

export default CustomButton;
