import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import MainLayout from '../../components/layout/MainLayout';
import HomeIcon from '../../components/Icons/HomeIcon';

const SettingsScreen = () => {
  return (
    <MainLayout>
      <SafeAreaView style={styles.content}>
        <HomeIcon />
      </SafeAreaView>
    </MainLayout>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
});
