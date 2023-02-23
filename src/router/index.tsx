import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import fonts from '../utils/fonts';
import colors from '../utils/colors';
import {normalize} from '../utils/dimensions';
import screenNames from '../utils/screenNames';
import localimages from '../utils/localimages';
import HomeScreen from '../modules/home/screens';
import {navigationRef} from '../utils/common';
import PlayerScreen from '../modules/player/screens';

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
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerLeft: leftIcon,
          headerShown: false,
          headerTitleStyle: styles.titleStyle,
        }}>
        <Stack.Screen
          name={screenNames.HOMESCREEN}
          component={HomeScreen}
          options={{title: 'Favorites', headerShown: true}}
        />
        <Stack.Screen name={screenNames.PLAYER} component={PlayerScreen} />
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
  titleStyle: {
    color: colors.BLACK,
    fontFamily: fonts.BOLD,
  },
});
