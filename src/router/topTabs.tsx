import {StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tabs = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tabs.Navigator>
      {/* <Tabs.Screen/>
        <Tabs.Screen/>
        <Tabs.Screen/> */}
    </Tabs.Navigator>
  );
};

export default TopTabs;

const styles = StyleSheet.create({});
