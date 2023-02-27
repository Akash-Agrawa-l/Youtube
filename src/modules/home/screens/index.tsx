import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import TopTabs from '../../../router/topTabs';
import colors from '../../../utils/colors';

const HomeScreen = () => {
  useEffect(() => {
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);
  return (
    <React.Fragment>
      <StatusBar
        backgroundColor={colors.TRANSPARENT}
        barStyle={'dark-content'}
        translucent={true}
      />
      <TopTabs />
    </React.Fragment>
  );
};

export default React.memo(HomeScreen);
