import React, {useEffect} from 'react';
import Orientation from 'react-native-orientation-locker';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import screenNames from '../utils/screenNames';
import Videos from '../modules/home/screens/videos';
import CustomTabBar from '../components/customTabBar';
import Articles from '../modules/home/screens/articles';
import Channels from '../modules/home/screens/channels';

const Tabs = createMaterialTopTabNavigator();

const TopTabs = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
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

export default React.memo(TopTabs);
