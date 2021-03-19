import React, { useState } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  View,
  Text,
  Modal,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';

import ConfirmAndCancelButtons from './ConfirmAndCancelButtons';
import Success from './Success';

export default function EditModal({
  visible,
  name,
  imgUrl,
  price,
  transport_fee,
  company,
  location,
  setVisible,
  id,
}) {
  const dbh = firebase.firestore();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [updatedPrice, setupdatedPrice] = useState(price);
  const [updatedTransport, setupdatedTransport] = useState(transport_fee);
  const [updatedCompany, setupdatedCompany] = useState(company);
  const [updatedLocation, setupdatedLocation] = useState(location);
  const [scrollRef, setScrollRef] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollRef.scrollToEnd({ animated: true });
    }, 200);
  };

  const confirmUpdate = (
    Company,
    Location,
    Price_transport,
    Price_with_shipping
  ) => {
    setSpinner(true);
    dbh
      .collection('shoes')
      .doc(id)
      .update({
        Company,
        Location,
        Price_transport,
        Price_with_shipping,
      })
      .then(() => {
        setSpinner(false);
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal animationType='fade' transparent visible={visible}>
      <View style={styles.modalView}>
        <ImageBackground
          source={require('../assets/images/texture.jpg')}
          style={styles.imageBackground}
        >
          <ScrollView
            keyboardShouldPersistTaps='handled'
            ref={(ref) => setScrollRef(ref)}
            showsVerticalScrollIndicator={false}
          >
            <KeyboardAvoidingView>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.title}>{name}</Text>
                <Image
                  style={styles.modalImage}
                  source={{
                    uri: imgUrl,
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.subText}>Price with shippng ($):</Text>
                  <Text style={styles.subText}>Transport fee (GEL):</Text>
                  <Text style={styles.subText}>Company:</Text>
                  <Text style={styles.subText}>Location:</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={styles.input}
                    value={updatedPrice}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedPrice(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={updatedTransport}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedTransport(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={updatedCompany}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedCompany(text)}
                  />
                  <TextInput
                    style={styles.input}
                    value={updatedLocation}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedLocation(text)}
                  />
                </View>
              </View>
              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setConfirmVisible(true)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </ImageBackground>
      </View>

      <Modal animationType='fade' transparent visible={confirmVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <ImageBackground
            source={require('../assets/images/texture.jpg')}
            style={styles.confirmBackground}
          >
            {spinner ? (
              <ActivityIndicator size='large' color='#cfa355' />
            ) : (
              <>
                {!success && (
                  <ConfirmAndCancelButtons
                    setConfirmVisible={setConfirmVisible}
                    confirm={() =>
                      confirmUpdate(
                        updatedCompany,
                        updatedLocation,
                        updatedTransport,
                        updatedPrice
                      )
                    }
                  />
                )}
              </>
            )}
            {success && (
              <Success
                setSuccess={() => {
                  setSuccess(false);
                  setConfirmVisible(false);
                  setVisible(false);
                }}
              />
            )}
          </ImageBackground>
        </View>
      </Modal>
    </Modal>
  );
}

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
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  confirmBackground: {
    borderRadius: 20,
    overflow: 'hidden',
    paddingTop: 10,
    height: 200,
    marginHorizontal: 20,
    justifyContent: 'space-evenly',
    borderWidth: 1,
  },
  input: {
    width: '100%',
    height: 35,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 7,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    fontSize: 14,
    marginVertical: 5,
  },
  modalImage: {
    height: 150,
    width: 150,
    marginBottom: 10,
  },
  modalView: {
    paddingHorizontal: 30,
    paddingVertical: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    flex: 1,
  },
  confirmModalView: {
    paddingHorizontal: 30,
    paddingVertical: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
  },

  subText: {
    fontSize: 13,
    color: 'black',
    height: 35,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlignVertical: 'center',
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
