/* eslint-disable react-hooks/exhaustive-deps */
import Video, {
  OnBufferData,
  OnLoadData,
  OnProgressData,
} from 'react-native-video';
import AnimatedLottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import React, {useCallback, useMemo, useState} from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';

import fonts from '../utils/fonts';
import colors from '../utils/colors';
import {VideoProps} from '../utils/modals';
import VideoControls from './videoControls';
import localimages from '../utils/localimages';
import {formatTime, navigationRef, vidRef} from '../utils/common';
import {screenWidth, screenHeight, normalize} from '../utils/dimensions';

const VideoComponent = ({source}: VideoProps) => {
  const [pause, setPaused] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [currenttime, setCurrenttime] = useState<number>(0);
  const [videoStyle, setVideoStyle] = useState<ViewStyle>(styles.protraitStyle);

  /**
   * @isFullscreen Function
   * @description returns boolean
   */
  const isFullscreen = useMemo(() => {
    return Object.keys(videoStyle)?.includes('position');
  }, [videoStyle]);

  /**
   * @pauseIcon Function
   * @description returns the required icon
   */
  const pauseIcon = useMemo(() => {
    return currenttime !== duration
      ? pause
        ? localimages.PLAY
        : localimages.PAUSE
      : localimages.REPLAY;
  }, [pause, currenttime, duration]);

  /**
   * @ComponentDidMount Function
   * @description add Orientation listeners
   */
  React.useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation === 'PORTRAIT') {
        setVideoStyle(styles.protraitStyle);
      } else {
        setVideoStyle(styles.fullscreenStyle);
      }
      Orientation.unlockAllOrientations();
    });
    return removeListeners;
  }, []);

  /**
   * @removeListeners Function
   * @description removes added listeners
   */
  const removeListeners = () => {
    setPaused(true);
    Orientation.lockToPortrait();
    Orientation.removeDeviceOrientationListener(orientation => {
      if (orientation === 'PORTRAIT') {
        setVideoStyle(styles.protraitStyle);
      }
    });
  };

  /**
   * @handleProgress Function
   * @description updates the current time of the video
   */
  const handleProgress = useCallback(
    (progress: OnProgressData) => {
      if (Math.floor(progress.currentTime) !== currenttime) {
        setCurrenttime(Math.floor(progress?.currentTime));
      }
      if (Math.floor(progress?.currentTime) === duration && duration !== 0) {
        setPaused(true);
      }
    },
    [currenttime],
  );

  /**
   * @onLoad Function
   * @description returns total duration of video and toggles loading state to false
   */
  const onLoad = useCallback(
    (data: OnLoadData) => {
      setLoading(false);
      setPaused(false);
      setCurrenttime(data?.currentTime);
      setDuration(Math.floor(data?.duration));
    },
    [loading, pause, currenttime, duration],
  );

  /**
   * @onLoadStart Function
   * @description toggles loading state to true
   */
  const onLoadStart = useCallback(() => {
    setLoading(true);
    setPaused(true);
  }, [loading, pause]);

  /**
   * @onBuffer Function
   * @description toggles loading state
   */
  const onBuffer = useCallback(
    (data: OnBufferData) => {
      if (loading !== data?.isBuffering) {
        setLoading(data?.isBuffering);
      }
    },
    [loading],
  );

  /**
   * @handleCurrentTime Function
   * @description updates currentTime state
   */
  const handleCurrentTime = useCallback(
    (value: number) => {
      setCurrenttime(value);
      setPaused(false);
    },
    [currenttime],
  );

  /**
   * @handlePause Function
   * @description for replaying video or pause/play video
   */
  const handlePause = useCallback(() => {
    if (currenttime !== duration) {
      setPaused(!pause);
    } else {
      setCurrenttime(0);
      vidRef?.current?.seek(0);
      setPaused(false);
    }
  }, [pause]);

  /**
   * @handleForward Function
   * @description to forward 10 seconds
   */
  const handleForward = () => {
    vidRef?.current?.seek(currenttime + 10);
  };

  /**
   * @handlerewind Function
   * @description to rewind 10 seconds
   */
  const handlerewind = () => {
    vidRef?.current?.seek(currenttime - 10);
  };

  /**
   * @getTime Function
   * @description returns time in hh/mm/ss and current Time / total duration format
   */
  const getTime = useCallback(() => {
    return `${formatTime(currenttime)}/${formatTime(duration)}`;
  }, [currenttime]);

  /**
   * @handleSeek Function
   * @description to seek video using seekbar
   */
  const handleSeek = (value: number) => {
    vidRef?.current?.seek(value);
    setPaused(false);
  };

  /**
   * @handleBack Function
   * @description on Back icon press
   */
  const handleBack = () => {
    navigationRef?.current?.goBack();
  };

  /**
   * @handleFullScreen Function
   * @description toggle fullscreen view
   */
  const handleFullScreen = useCallback(() => {
    if (isFullscreen) {
      Orientation.lockToPortrait();
      setVideoStyle(styles.protraitStyle);
    } else {
      Orientation.lockToLandscape();
      setVideoStyle(styles.fullscreenStyle);
    }
  }, [videoStyle]);

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
      {loading ? (
        <AnimatedLottieView
          source={localimages.LOADER}
          style={styles.loaderStyle}
          resizeMode={'contain'}
          autoSize={true}
          autoPlay
          loop
        />
      ) : (
        <VideoControls
          handleBack={handleBack}
          handlerewind={handlerewind}
          handlePause={handlePause}
          handleForward={handleForward}
          handleSeek={handleSeek}
          handleCurrentTime={handleCurrentTime}
          handleFullScreen={handleFullScreen}
          timeStamp={getTime()}
          duration={duration}
          currenttime={currenttime}
          isFullscreen={isFullscreen}
          pauseIcon={pauseIcon}
        />
      )}
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
    alignSelf: 'center',
    height: normalize(99),
    width: normalize(99),
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
  protraitStyle: {
    width: '100%',
    aspectRatio: 1 / 0.557,
    backgroundColor: colors.BLACK,
    justifyContent: 'center',
  },
  fullscreenStyle: {
    height: screenWidth,
    width: '100%',
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 10,
    elevation: 10,
    shadowColor: colors.TRANSPARENT,
    justifyContent: 'center',
  },
});
