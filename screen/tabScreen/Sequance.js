import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MainLayout from '../../components/layout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from '../../store/context';
import NameHeader from '../../components/UI/NameHeader';

const Sequance = ({navigation}) => {
  // const {nickname} = useContext(AppContext);

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <NameHeader />

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.title}>
            Sequences – Your Path to{'\n'}Mastery
          </Text>
          <Text style={styles.subtitle}>
            Craft your journey one step at a time
          </Text>

          {/* Features List */}
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Set Goals</Text>
            <Text style={styles.featureItem}>• Stay on Track</Text>
            <Text style={styles.featureItem}>• See Daily Tasks</Text>
          </View>

          {/* Add Button */}
          <TouchableOpacity style={styles.addButton} onPress={()=>navigation.navigate('CreateSequance')}>
            <LinearGradient
              colors={['#FFEA9E', '#FCF8EA']}
              style={styles.addButtonGradient}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}>
              <Text style={styles.addButtonText}>+</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 32,
    color: '#FCF8EA',
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#FCF8EA',
    opacity: 0.8,
    marginBottom: 40,
  },
  featuresList: {
    paddingLeft: 20,
  },
  featureItem: {
    fontSize: 24,
    color: '#FCF8EA',
    marginBottom: 16,
    fontWeight: '500',
  },
  addButton: {
    // position: 'absolute',
    // bottom: 100,
    alignSelf: 'center',
    marginTop: 40,
  },
  addButtonGradient: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
    // transform: [{scale: 1.8}],
  },
});

export default Sequance;
