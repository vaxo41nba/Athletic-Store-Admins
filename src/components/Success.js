import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default Success = ({ setSuccess }) => {
  return (
    <>
      <Text style={styles.confirmText}>Done Successfully</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={setSuccess}>
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  button: {
    backgroundColor: 'black',
    height: 40,
    width: '45%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#cfa355',
    fontSize: 18,
    fontFamily: 'Roboto',
  },
  confirmText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
