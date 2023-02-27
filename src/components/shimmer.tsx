import {StyleSheet} from 'react-native';
import React from 'react';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
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
  },
});
