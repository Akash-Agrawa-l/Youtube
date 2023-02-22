import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '../utils/screenNames';
import HomeScreen from '../modules/home/screens';

const Stack = createNativeStackNavigator();

const RootRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={screenNames.HOMESCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRouter;
