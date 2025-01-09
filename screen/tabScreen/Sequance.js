import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MainLayout from '../../components/layout/MainLayout';
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from '../../store/context';
import NameHeader from '../../components/UI/NameHeader';

const Sequance = ({navigation}) => {
  const {sequences} = useContext(AppContext);

  const handleAddPress = () => {
    navigation.navigate('CreateSequance');
  };

  return (
    <MainLayout>
      <SafeAreaView style={styles.container}>
        {/* Header Section */}
        <NameHeader />

        {/* Sequences List */}
        <ScrollView style={styles.scrollView}>
          {sequences.map(sequence => (
            <TouchableOpacity
              key={sequence.id}
              style={styles.sequenceCard}
              onPress={() =>
                navigation.navigate('SequenceDetails', {id: sequence.id})
              }>
              <View
                style={[
                  styles.cardIndicator,
                  {backgroundColor: sequence.color},
                ]}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{sequence.goal}</Text>
                <Text style={styles.cardDescription} numberOfLines={2}>
                  {sequence.description}
                </Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.dateText}>
                    {sequence.startDate} - {sequence.endDate}
                  </Text>
                  {/* <Text style={styles.progressText}>{sequence.progress}%</Text> */}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <LinearGradient
            colors={['#FFEA9E', '#FCF8EA']}
            style={styles.addButtonGradient}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <Text style={styles.addButtonText}>+</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{height: 110}}></View>
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
    marginTop: 20,
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
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  sequenceCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    marginBottom: 16,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  cardIndicator: {
    width: 4,
    height: '100%',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    color: '#FCF8EA',
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#FCF8EA',
    opacity: 0.8,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: '#FCF8EA',
    opacity: 0.6,
  },
  progressText: {
    fontSize: 14,
    color: '#FCF8EA',
    fontWeight: '600',
  },
});

export default Sequance;
