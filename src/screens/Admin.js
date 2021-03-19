import React, { useState, useEffect, useRef } from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';

import CustomBackground from '../components/CustomBackground';
import Shoe from '../screens/Shoe';
import AddModal from '../components/AddModal';

export default function Admin({ navigation }) {
  const dbh = firebase.firestore();
  const mounted = useRef();

  const [shoesObj, setShoesObj] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const getShoes = async () => {
    let obj = {};
    const shoes = await dbh.collection('shoes').get();
    shoes.forEach((doc) => {
      obj[doc.id] = doc.data();
    });
    setShoesObj(obj);
  };

  useEffect(() => {
    getShoes();
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      getShoes();
    }
  }, [addModalVisible]);

  return (
    <CustomBackground style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.text}>Orders</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back.png')}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.block}>
        {shoesObj &&
          Object.keys(shoesObj).map((id) => (
            <Shoe key={id} id={id} shoe={shoesObj[id]} />
          ))}
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setAddModalVisible(true)}
        >
          <ImageBackground
            source={require('../assets/images/texture.jpg')}
            style={styles.imageBackground}
          >
            <Text style={[styles.text, { color: 'black' }]}>Add Item</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <AddModal visible={addModalVisible} setVisible={setAddModalVisible} />
    </CustomBackground>
  );
}

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    width: '70%',
    height: 50,
  },
  block: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
});
