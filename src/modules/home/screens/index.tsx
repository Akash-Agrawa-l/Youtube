import React from 'react';
import {StatusBar} from 'react-native';
import TopTabs from '../../../router/topTabs';

const HomeScreen = () => {
  return (
    <React.Fragment>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} />
      <TopTabs />
    </React.Fragment>
  );
};

export default React.memo(HomeScreen);
