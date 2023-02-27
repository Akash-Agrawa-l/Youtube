/* eslint-disable react-hooks/exhaustive-deps */
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import {screenWidth, screenHeight, normalize} from '../utils/dimensions';
import colors from '../utils/colors';
import localimages from '../utils/localimages';
import Slider from '@react-native-community/slider';
import {formatTime, navigationRef, vidRef} from '../utils/common';
import fonts from '../utils/fonts';
import AnimatedLottieView from 'lottie-react-native';
// import VideoControls from './videoControls';
import Orientation from 'react-native-orientation-locker';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const VideoComponent = ({source, controlsContainer = {}}: any) => {
  const [currenttime, setCurrenttime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [pause, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);

  const protraitStyle: ViewStyle = {
    width: '100%',
    aspectRatio: 1 / 0.557,
    backgroundColor: colors.BLACK,
  };

  const fullscreenStyle: ViewStyle = {
    height: screenWidth,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 10,
    elevation: 10,
    shadowColor: colors.TRANSPARENT,
  };

  const [videoStyle, setVideoStyle] = useState<ViewStyle>(protraitStyle);

  const isFullscreen = Object.keys(videoStyle).includes('position');

  React.useEffect(() => {
    setPaused(false);
    return () => {
      setPaused(true);
    };
  }, []);

  React.useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation.includes('PORTRAIT')) {
        setVideoStyle(protraitStyle);
      } else {
        setVideoStyle(fullscreenStyle);
        Orientation.unlockAllOrientations();
      }
    });
    return () => {
      Orientation.removeLockListener(handleFullScreen);
    };
  }, []);

  const handleProgress = (progress: OnProgressData) => {
    if (Math.floor(progress.currentTime) !== currenttime) {
      setCurrenttime(Math.floor(progress.currentTime));
    }
  };
  const onLoad = (data: OnLoadData) => {
    setLoading(false);
    setCurrenttime(data.currentTime);
    setDuration(data.duration);
  };
  const onLoadStart = () => {
    setLoading(true);
  };
  const onBuffer = (data: OnBufferData) => {
    if (loading !== data.isBuffering) {
      setLoading(data.isBuffering);
    }
  };

  const handlePause = useCallback(() => {
    setPaused(!pause);
  }, [pause]);
  const handleForward = () => {
    vidRef?.current?.seek(currenttime + 10);
  };
  const handlerewind = () => {
    vidRef?.current?.seek(currenttime - 10);
  };
  const getTime = useCallback(() => {
    return `${formatTime(currenttime)}/${formatTime(duration)}`;
  }, [currenttime]);

  const handleSeek = (value: number) => {
    vidRef?.current?.seek(value);
    setCurrenttime(value);
  };

  const handleBack = () => {
    navigationRef.current.goBack();
    Orientation.unlockAllOrientations();
  };

  const handleFullScreen = () => {
    if (isFullscreen) {
      Orientation.unlockAllOrientations();
      setVideoStyle(protraitStyle);
    } else {
      Orientation.lockToLandscape();
      setVideoStyle(fullscreenStyle);
    }
  };

  return (
    <View style={videoStyle}>
      <Video
        ref={vidRef}
        style={styles.videoStyle}
        resizeMode={isFullscreen ? 'contain' : 'cover'}
        source={{uri: source}}
        onLoad={onLoad}
        onBuffer={onBuffer}
        onLoadStart={onLoadStart}
        onProgress={handleProgress}
        paused={pause}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 5000,
        }}
        playInBackground={false}
        playWhenInactive={false}
      />
      <AnimatedButton
        style={[styles.controlContainer, controlsContainer]}
        activeOpacity={1}>
        {loading ? (
          <AnimatedLottieView
            source={localimages.LOADER}
            style={styles.loaderStyle}
            autoSize={true}
            autoPlay
            loop
          />
        ) : (
          <React.Fragment>
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={handleBack}>
              <Image source={localimages.BACKARROW} style={styles.backIcon} />
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
                <Image
                  source={pause ? localimages.PLAY : localimages.PAUSE}
                  style={styles.playIcon}
                />
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
              />
              <View style={styles.bottomDetailsRow}>
                <Text style={styles.timeStamp}>{getTime()}</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={handleFullScreen}>
                  <Image
                    source={
                      isFullscreen
                        ? localimages.MINIMIZE
                        : localimages.FULLSCREEN
                    }
                    style={styles.fullscreenIcon}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </React.Fragment>
        )}
      </AnimatedButton>
    </View>
  );
};

export default React.memo(VideoComponent);

const styles = StyleSheet.create({
  videoContainer: {
    width: '100%',
    aspectRatio: 1 / 0.557,
    backgroundColor: colors.BLACK,
  },
  fullscreenContainer: {
    height: screenHeight,
    width: screenWidth,
    zIndex: 5,
    elevation: 5,
    shadowColor: colors.TRANSPARENT,
    backgroundColor: 'red',
    ...StyleSheet.absoluteFillObject,
  },
  videoStyle: {
    height: '100%',
    width: '100%',
  },
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
    height: normalize(30),
    width: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'center',
  },
  centerControls: {
    flexDirection: 'row',
    position: 'absolute',
  },
  rewindButton: {
    height: normalize(30),
    width: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: normalize(30),
  },
  forwardButton: {
    height: normalize(30),
    width: normalize(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: normalize(30),
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
  fullscreenIcon: {
    height: normalize(20),
    width: normalize(20),
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
});
