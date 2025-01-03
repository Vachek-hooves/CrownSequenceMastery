import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';

const ResultScreen = () => {
  return (
    <MainLayout>
      <SafeAreaView style={styles.content}>
        <HomeIcon />
      </SafeAreaView>
    </MainLayout>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});
