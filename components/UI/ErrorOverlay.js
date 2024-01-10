import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const ErrorOverlay = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error ocuured!</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 0,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: 'white',
  },
});

export default ErrorOverlay;
