import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import EditModal from '../components/EditModal';

export default function Shoe({ shoe, id }) {
  const [visible, setVisible] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.body} onPress={() => setVisible(true)}>
        {shoe.imgUrl ? (
          <Image
            style={styles.image}
            source={{
              uri: shoe.imgUrl,
            }}
          />
        ) : (
          <Image
            style={styles.image}
            source={require('../assets/images/default-image.jpg')}
          />
        )}

        <Text style={styles.text}>{shoe.name}</Text>
      </TouchableOpacity>

      <EditModal
        visible={visible}
        setVisible={setVisible}
        name={shoe.name}
        imgUrl={shoe.imgUrl}
        price={shoe.Price_with_shipping}
        transport_fee={shoe.Price_transport}
        company={shoe.Company}
        location={shoe.Location}
        id={id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    width: '100%',
  },
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
  container: {
    width: '45%',
    marginVertical: 10,
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 150,
  },
  imageBackground: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    paddingHorizontal: 20,
    paddingVertical: 15,
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
  subText: {
    fontSize: 13,
    color: 'black',
    height: 35,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlignVertical: 'center',
  },
  text: {
    fontSize: 13,
    color: 'white',
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
