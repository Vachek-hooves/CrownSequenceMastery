import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../components/UI/CustomButton';
import {useAppContext} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import ReturnIcon from '../../components/Icons/ReturnIcon';

const CustomizeScreen = () => {
  const navigation = useNavigation();
  const {totalScore} = useAppContext();

  return (
    <MainLayout>
      <ScrollView
        // style={styles.content}
        contentContainerStyle={styles.content}>
        <View style={styles.mainContent}>
          <Text style={styles.title}>Crown Customization</Text>
          <Text style={styles.subtitle}>
            Choose colors, patterns, and effects to make your crown truly yours.
            Let it shine as you conquer new sequences!
          </Text>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SelectCrownScreen')}
              style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#FFEA9E', '#FCF8EA']}
                style={styles.button}>
                <Text style={styles.buttonText}>Select Crown Set</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SelectBackgroundScreen')}
              style={styles.buttonWrapper}>
              <LinearGradient
                colors={['#FFEA9E', '#FCF8EA']}
                style={styles.button}>
                <Text style={styles.buttonText}>Choose Background</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <ReturnIcon />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    fontSize: 24,
    color: '#FCF8EA',
    fontWeight: 'bold',
  },
  crownIcon: {
    fontSize: 24,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: '500',
    color: '#FCF8EA',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(252, 248, 234, 0.7)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#FCF8EA',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
    lineHeight: 24,
    fontWeight: '500',
  },
  buttonsContainer: {
    gap: 16,
  },
  buttonWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 40,
      height: 40,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 0,
  },
  button: {
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    letterSpacing: 1,
  },
});

export default CustomizeScreen;
