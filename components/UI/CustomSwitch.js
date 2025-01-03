import React from 'react';
import {StyleSheet, Switch} from 'react-native';

const CustomSwitch = ({value, onValueChange}) => {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{
        false: 'rgba(128, 128, 128, 0.3)',
        true: '#FCF8EA',
      }}
      thumbColor={value ? '#000' : '#FCF8EA'}
      ios_backgroundColor="rgba(128, 128, 128, 0.3)"
      style={styles.switch}
     
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    transform: [{scaleX: 1}, {scaleY: 1}],
    opacity: 0.9,
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: value => (value ? 0.5 : 0),
    shadowRadius: 10,
  },
});

export default CustomSwitch;