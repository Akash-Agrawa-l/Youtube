import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import screenNames from '../utils/screenNames';
import HomeScreen from '../modules/home/screens';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../utils/colors';
import localimages from '../utils/localimages';
import {normalize} from '../utils/dimensions';

const Stack = createNativeStackNavigator();

const leftIcon = () => {
  return (
    <TouchableOpacity>
      <Image source={localimages.BACKARROW} style={styles.backIcon} />
    </TouchableOpacity>
  );
};

const RootRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTintColor: colors.BLACK,
          headerLeft: leftIcon,
        }}>
        <Stack.Screen name={screenNames.HOMESCREEN} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootRouter;

const styles = StyleSheet.create({
  backIcon: {
    width: normalize(18),
    height: normalize(18),
    resizeMode: 'contain',
  },
});
