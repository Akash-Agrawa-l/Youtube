import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const RootRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>{/* <Stack.Screen /> */}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRouter;
