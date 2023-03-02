import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import colors from '../utils/colors';
import {screenHeight, screenWidth} from '../utils/dimensions';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Shimmer = () => {
  return (
    <ShimmerPlaceholder
      shimmerColors={[
        colors.SHIMMERBACKGROUND,
        colors.SHIMMER,
        colors.SHIMMERBACKGROUND,
      ]}
      height={screenHeight}
      width={screenWidth}
      location={[0.4, 0.5, 0.6]}
      style={styles.shimmerStyle}
    />
  );
};

export default React.memo(Shimmer);

const styles = StyleSheet.create({
  shimmerStyle: {
    position: 'absolute',
    zIndex: 10,
    elevation: 10,
    shadowColor: colors.TRANSPARENT,
  },
});
