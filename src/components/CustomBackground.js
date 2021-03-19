import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Constants from 'expo-constants';

export default class CustomBackground extends Component {
  render() {
    const { children, style } = this.props;
    return (
      <>
        <Image
          source={require('../assets/images/texture.jpg')}
          style={styles.statusbar}
        />
        <View style={[style, styles.container]}>{children}</View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    width: '100%',
    paddingHorizontal: 15,
  },
  statusbar: {
    height: Constants.statusBarHeight,
    width: '100%',
  },
});
