import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PlayerScreen = ({route}) => {
  console.log('route', route.params);
  return (
    <View>
      <Text>PlayerScreen</Text>
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({});
