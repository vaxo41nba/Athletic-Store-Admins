import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

import CustomBackground from '../components/CustomBackground';

export default function Welcome({ navigation }) {
  const [loaded] = useFonts({
    Cardinal: require('../assets/fonts/Cardinal.ttf'),
    Airmole_Stripe: require('../assets/fonts/Airmole_Stripe.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <CustomBackground style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
      />
      <Text style={styles.text}>Athletic Store</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Admin')}
      >
        <Text style={styles.buttonText}>Click to start!</Text>
      </TouchableOpacity>
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cfa355',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Cardinal',
    fontSize: 35,
    color: '#cfa355',
  },
  container: {
    justifyContent: 'space-between',
  },
  // logoContainer: {
  //   height: '50%',
  //   borderWidth: 1,
  //   borderColor: 'white',
  // },
  logo: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',
    // borderWidth: 2,
    // borderColor: 'white',
  },
  text: {
    fontSize: 50,
    color: '#cfa355',
    fontFamily: 'Airmole_Stripe',
    textAlign: 'center',
  },
});
