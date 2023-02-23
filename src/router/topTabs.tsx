import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import screenNames from '../utils/screenNames';
import Channels from '../modules/home/screens/channels';
import Videos from '../modules/home/screens/videos';
import Articles from '../modules/home/screens/articles';
import CustomTabBar from '../components/customTabBar';

const Tabs = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (
    <Tabs.Navigator
      initialRouteName={screenNames.VIDEOS}
      tabBar={CustomTabBar}
      screenOptions={{
        swipeEnabled: false,
      }}>
      <Tabs.Screen name={screenNames.CHANNELS} component={Channels} />
      <Tabs.Screen name={screenNames.VIDEOS} component={Videos} />
      <Tabs.Screen name={screenNames.ARTICLES} component={Articles} />
    </Tabs.Navigator>
  );
};

export default TopTabs;
