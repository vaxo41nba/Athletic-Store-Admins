import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default ConfirmAndCancelButtons = ({ confirm, setConfirmVisible }) => {
  return (
    <>
      <Text style={styles.confirmText}>Please, Confirm</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={confirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setConfirmVisible(false)}
        >
          <Text style={styles.buttonText}>Cancel</Text>
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
