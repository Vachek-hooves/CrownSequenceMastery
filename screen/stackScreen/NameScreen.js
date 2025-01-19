import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import HomeIcon from '../../components/Icons/HomeIcon';

const NameScreen = ({navigation}) => {
  const [nickname, setNickname] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const isValidNickname = nickname.trim().length > 1;

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedNickname = await AsyncStorage.getItem('userNickname');
      const savedImage = await AsyncStorage.getItem('userImage');

      if (savedNickname) {
        setNickname(savedNickname);
        setIsExistingUser(true);
      }
      if (savedImage) {
        setUserImage(savedImage);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 0.7,
    };

    try {
      const result = await launchImageLibrary(options);
      if (result.assets && result.assets[0]) {
        setUserImage(result.assets[0].uri);
        await AsyncStorage.setItem('userImage', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to select image');
    }
  };

  const saveNickname = async () => {
    try {
      if (!isValidNickname) {
        Alert.alert('Error', 'Nickname must be at least 3 characters');
        return;
      }

      await AsyncStorage.setItem('userNickname', nickname.trim());
      navigation.navigate('Navigation');
    } catch (error) {
      console.error('Error saving nickname:', error);
      Alert.alert('Error', 'Failed to save nickname. Please try again.');
    }
  };

  const deleteUserData = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.multiRemove(['userNickname', 'userImage']);
              setNickname('');
              setUserImage(null);
              setIsExistingUser(false);
            } catch (error) {
              console.error('Error deleting user data:', error);
              Alert.alert('Error', 'Failed to delete profile');
            }
          },
        },
      ],
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bg/bg.png')}
      style={styles.container}
      // blurRadius={100}
    >
      <SafeAreaView style={styles.content}>
        <ScrollView>
          <View style={styles.headerRow}>
            <HomeIcon />
            <Text style={styles.title}>Nickname</Text>
          </View>
          <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
            {userImage ? (
              <Image source={{uri: userImage}} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.subtitle}>
            Every ruler needs a name. Enter yours to begin the challenge
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your nickname"
              placeholderTextColor="rgba(252, 248, 234, 0.5)"
              value={nickname}
              onChangeText={setNickname}
              maxLength={20}
            />
          </View>
          {isExistingUser && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteUserData}>
              <Text style={styles.deleteButtonText}>Delete Profile</Text>
            </TouchableOpacity>
          )}
          {/* <View style={{height: 100}} /> */}
        </ScrollView>
        {isValidNickname ? (
          <LinearGradient
            // colors={['#FFEA9E', '#FCF8EA']}
            colors={['#FF6B6B', '#4ECDC4']}
            style={[styles.startButton, styles.startButtonShadow]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}>
            <TouchableOpacity onPress={saveNickname}>
            {/* <TouchableOpacity > */}
              <Text style={styles.startButtonTextActive}>
                {isExistingUser ? 'Continue' : 'Start'}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              Alert.alert('Error', 'Nickname must be at least 3 characters')
            }>
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
    padding: 30,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    paddingLeft: '10%',
  },
  subtitle: {
    fontSize: 24,
    color: '#FCF8EA',
    textShadowColor: 'rgba(252, 248, 234, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 8,
    marginVertical: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  input: {
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    borderRadius: 25,
    paddingVertical: 18,
    fontSize: 20,
    color: '#FCF8EA',
    paddingHorizontal: 20,
  },
  startButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.3)',
    // padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    marginTop:40
  },
  startButtonShadow: {
    shadowColor: '#FCF8EA',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  startButtonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FCF8EA',
    padding: 15,
  },
  startButtonTextActive: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Dark text for better contrast on light gradient
    padding: 15,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FCF8EA',
  },
  placeholderImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(252, 248, 234, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCF8EA',
  },
  placeholderText: {
    color: '#FCF8EA',
    fontSize: 14,
  },
  deleteButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#FF6B6B',
    borderRadius: 25,
  },
  deleteButtonText: {
    color: '#FCF8EA',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default NameScreen;
