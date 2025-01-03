import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import React from 'react';

const MainLayout = ({children}) => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}>
      {children}
    </ImageBackground>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
  },
});
