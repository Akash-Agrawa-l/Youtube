import React from 'react';
import {StatusBar} from 'react-native';
import TopTabs from '../../../router/topTabs';
import colors from '../../../utils/colors';

const HomeScreen = () => {
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
