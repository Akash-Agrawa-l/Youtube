import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import React from 'react';
import colors from '../utils/colors';
import {normalize} from '../utils/dimensions';
import fonts from '../utils/fonts';

const CustomTabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.contentContainerStyle}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          navigation.jumpTo(state.routeNames[index]);
        };

        return (
          <TouchableOpacity
            onPress={onPress}
            key={index}
            style={styles.buttonStyle}>
            <View style={isFocused ? styles.activeView : styles.inactiveView}>
              <Text
                style={
                  isFocused
                    ? styles.activelabelStyle
                    : styles.inactivelabelStyle
                }>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    paddingVertical: normalize(5),
  },
  inactivelabelStyle: {
    color: colors.GREY,
    fontSize: normalize(14),
    fontFamily: fonts.SEMIBOLD,
  },
  activelabelStyle: {
    color: colors.WHITE,
    fontSize: normalize(14),
    fontFamily: fonts.SEMIBOLD,
  },
  inactiveView: {
    backgroundColor: colors.WHITE,
    alignItems: 'center',
    borderRadius: normalize(14),
    padding: normalize(15),
    paddingVertical: normalize(3),
  },
  activeView: {
    backgroundColor: colors.CYAN,
    alignItems: 'center',
    borderRadius: normalize(14),
    padding: normalize(15),
    paddingVertical: normalize(3),
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
  },
});
