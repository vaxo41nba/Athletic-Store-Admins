import React, { useEffect, useRef, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
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
  Platform,
} from 'react-native';

import ConfirmAndCancelButtons from './ConfirmAndCancelButtons';
import Success from './Success';
import uriToBlob from '../utils/uriToBlob';

export default function AddModal({ visible, setVisible }) {
  const dbh = firebase.firestore();
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [name, setName] = useState(null);
  const [updatedPrice, setupdatedPrice] = useState(null);
  const [updatedTransport, setupdatedTransport] = useState(null);
  const [updatedCompany, setupdatedCompany] = useState(null);
  const [updatedLocation, setupdatedLocation] = useState(null);
  const [scrollRef, setScrollRef] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [success, setSuccess] = useState(false);
  const [image, setImage] = useState(null);
  const [blob, setBlob] = useState(null);

  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  let imgUrl;
  const mounted = useRef();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      uriToBlob(image ? image : '')
        .then((blob) => setBlob(blob))
        .catch((err) => console.log(err));
    }
  }, [image]);

  const scrollToEnd = () => {
    setTimeout(() => {
      scrollRef.scrollToEnd({ animated: true });
    }, 200);
  };

  const confirmAdd = async (
    name,
    Price_with_shipping,
    Price_transport,
    Company,
    Location,
    imgUrl
  ) => {
    setSpinner(true);

    try {
      await firebase.storage().ref(name).put(blob);
    } catch (error) {
      console.log('uploading image error => ', error);
      setSpinner(false);
      setConfirmVisible(false);
      return;
    }

    try {
      imgUrl = await firebase.storage().ref(name).getDownloadURL();
    } catch (error) {
      console.log(' error getting URL => ', error);
      setSpinner(false);
      setConfirmVisible(false);
      return;
    }

    try {
      await dbh.collection('shoes').doc(`${name} (${randomNumber})`).set({
        name,
        Price_with_shipping,
        Price_transport,
        Company,
        Location,
        imgUrl,
      });
    } catch (error) {
      console.log(' error adding to database => ', error);
      setSpinner(false);
      setConfirmVisible(false);
      return;
    }

    setSpinner(false);
    setSuccess(true);
  };

  const cancel = () => {
    setVisible(false);
    setupdatedLocation(null);
    setupdatedPrice(null);
    setupdatedCompany(null);
    setupdatedTransport(null);
  };

  const pickImage = async () => {
    if (Platform.OS !== 'web') {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      } else {
        let result = await ImagePicker.launchImageLibraryAsync({
          quality: 0.5,
        });

        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    }
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
                {/* <Text> {JSON.stringify(imgUrl)}</Text>  */}
                <TouchableOpacity onPress={pickImage}>
                  {image ? (
                    <Image
                      style={styles.modalImage}
                      source={{
                        uri: image,
                      }}
                    />
                  ) : (
                    <Image
                      style={styles.modalImage}
                      source={require('../assets/images/default-image.jpg')}
                    />
                  )}
                </TouchableOpacity>
                <Text style={{ opacity: 0.3, marginBottom: 10 }}>
                  Press to pick image
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.subText}>Name:</Text>
                  <Text style={styles.subText}>Price with shippng ($):</Text>
                  <Text style={styles.subText}>Transport fee (GEL):</Text>
                  <Text style={styles.subText}>Company:</Text>
                  <Text style={styles.subText}>Location:</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <TextInput
                    style={styles.input}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setName(text)}
                  />
                  <TextInput
                    style={styles.input}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedPrice(text)}
                  />
                  <TextInput
                    style={styles.input}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedTransport(text)}
                  />
                  <TextInput
                    style={styles.input}
                    onFocus={scrollToEnd}
                    onChangeText={(text) => setupdatedCompany(text)}
                  />
                  <TextInput
                    style={styles.input}
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
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={cancel}>
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
                      confirmAdd(
                        name,
                        updatedPrice,
                        updatedTransport,
                        updatedCompany,
                        updatedLocation,
                        imgUrl
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
    // borderWidth: 2,
    // borderColor: 'blue',
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
  },
  modalView: {
    paddingHorizontal: 30,
    paddingVertical: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // justifyContent: 'center',
    // alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'yellow',
    flex: 1,
  },
  confirmModalView: {
    paddingHorizontal: 30,
    paddingVertical: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // borderWidth: 1,
    // borderColor: 'yellow',
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
