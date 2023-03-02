import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Image, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import fonts from '../utils/fonts';
import colors from '../utils/colors';
import {normalize} from '../utils/dimensions';
import screenNames from '../utils/screenNames';
import localimages from '../utils/localimages';
import {navigationRef} from '../utils/common';
import PlayerScreen from '../modules/player/screens';
import topTabs from './topTabs';

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
      <StatusBar
        backgroundColor={colors.TRANSPARENT}
        barStyle={'dark-content'}
        translucent={true}
      />
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
          component={topTabs}
          options={{title: 'Favorites', headerShown: true}}
        />
        <Stack.Screen name={screenNames.PLAYER} component={PlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(RootRouter);

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
