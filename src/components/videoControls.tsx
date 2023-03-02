import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import Slider from '@react-native-community/slider';

import localimages from '../utils/localimages';
import colors from '../utils/colors';
import {normalize} from '../utils/dimensions';
import fonts from '../utils/fonts';
import {controlProps} from '../utils/modals';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const VideoControls = ({
  duration,
  pauseIcon,
  timeStamp,
  handleBack,
  handleSeek,
  currenttime,
  handlePause,
  isFullscreen,
  handlerewind,
  handleForward,
  handleFullScreen,
  handleCurrentTime,
}: controlProps) => {
  useEffect(() => {}, []);
  return (
    <AnimatedButton style={styles.controlContainer} activeOpacity={1}>
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={handleBack}>
        <Image source={localimages.BACKARROW} style={styles.backIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuButton} activeOpacity={0.8}>
        <Image source={localimages.MENU} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.centerControls}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlerewind}
          style={styles.rewindButton}>
          <Image source={localimages.BACK} style={styles.playIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handlePause}
          style={styles.playButton}>
          <Image source={pauseIcon} style={styles.playIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleForward}
          style={styles.forwardButton}>
          <Image source={localimages.FORWARD} style={styles.playIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomDetails}>
        <Slider
          style={styles.seekbar}
          value={currenttime}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor={colors.CYAN}
          maximumTrackTintColor={colors.TRANSLUSCENT}
          tapToSeek={true}
          thumbImage={localimages.DOT}
          step={1}
          onValueChange={handleSeek}
          onSlidingComplete={handleCurrentTime}
        />
        <View style={styles.bottomDetailsRow}>
          <Text style={styles.timeStamp}>{timeStamp}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.fullscreenButton}
            onPress={handleFullScreen}>
            <Image
              source={
                isFullscreen ? localimages.MINIMIZE : localimages.FULLSCREEN
              }
              style={styles.fullscreenIcon}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedButton>
  );
};

export default React.memo(VideoControls);

const styles = StyleSheet.create({
  controlContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: normalize(15),
    backgroundColor: colors.TRANSLUSCENT,
  },
  playButton: {
    height: '100%',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  centerControls: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '55%',
    height: normalize(35),
  },
  rewindButton: {
    height: '100%',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forwardButton: {
    height: '100%',
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekbar: {width: '100%'},
  bottomDetails: {
    width: '100%',
    alignSelf: 'flex-end',
    paddingBottom: normalize(10),
  },
  bottomDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? normalize(-10) : 0,
    paddingHorizontal: normalize(5),
    justifyContent: 'space-between',
  },
  timeStamp: {
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(12),
    color: colors.WHITE,
  },
  loaderStyle: {
    position: 'absolute',
    height: normalize(110),
    width: normalize(110),
    zIndex: 5,
  },
  fullscreenButton: {
    height: normalize(20),
    width: normalize(20),
  },
  fullscreenIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  backButton: {
    width: normalize(18),
    height: normalize(18),
    position: 'absolute',
    top: '4%',
    left: '4%',
  },
  backIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    tintColor: colors.WHITE,
  },
  menuButton: {
    width: normalize(18),
    height: normalize(18),
    position: 'absolute',
    top: '4%',
    right: '4%',
  },
});
