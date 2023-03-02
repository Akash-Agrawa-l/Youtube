import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {cardProps} from '../utils/modals';
import {normalize} from '../utils/dimensions';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import localimages from '../utils/localimages';
import Shimmer from './shimmer';
import Video from 'react-native-video';

const FeedCard = ({
  title,
  thumb,
  views,
  index,
  source,
  onPress,
  subtitle,
  duration,
  uploadedAt,
  currentIndex,
}: cardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const onLoadStart = () => {
    setIsLoading(true);
  };
  const onLoadEnd = () => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.cardContainerStyle}>
      <View style={styles.imageContainer}>
        {currentIndex === index && source && (
          <Video
            source={{uri: source}}
            style={styles.videoStyle}
            resizeMode={'contain'}
            muted={true}
          />
        )}
        <Image
          source={{uri: thumb}}
          resizeMode={'cover'}
          style={styles.thumbImageStyle}
          onLoadStart={onLoadStart}
          onLoadEnd={onLoadEnd}
        />
        <Image
          source={localimages.PLAY}
          style={styles.playIcon}
          resizeMode={'center'}
        />
        <View style={styles.timeStampContainer}>
          <Text style={styles.timeStamp}>{duration}</Text>
        </View>
        {isLoading && <Shimmer />}
      </View>
      <View style={styles.detailContainer}>
        {isLoading ? (
          <View style={styles.titleshimmerContainer}>
            <Shimmer />
          </View>
        ) : (
          <Text style={styles.titleStyle}>{title}</Text>
        )}
        {isLoading ? (
          <View style={styles.timeshimmerContainer}>
            <Shimmer />
          </View>
        ) : (
          <Text
            style={styles.viewStyle}>{`${views}  \u2022  ${uploadedAt}`}</Text>
        )}

        <View style={styles.userDetailContainer}>
          <View style={styles.profilePicContainer}>
            {isLoading ? (
              <Shimmer />
            ) : (
              <Image
                source={localimages.PROFILEPIC}
                style={styles.profilePicStyle}
              />
            )}
          </View>
          {isLoading ? (
            <View style={styles.timeshimmerContainer}>
              <Shimmer />
            </View>
          ) : (
            <Text style={styles.profileNameText}>{subtitle}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(FeedCard);

const styles = StyleSheet.create({
  cardContainerStyle: {
    marginHorizontal: normalize(15),
    marginTop: normalize(15),
    backgroundColor: colors.WHITE,
    borderRadius: normalize(10),
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1 / 0.563,
    overflow: 'hidden',
    borderTopRightRadius: normalize(10),
    borderTopLeftRadius: normalize(10),
  },
  thumbImageStyle: {
    width: '100%',
    aspectRatio: 1 / 0.563,
  },
  videoStyle: {
    width: '100%',
    aspectRatio: 1 / 0.563,
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    backgroundColor: colors.BLACK,
  },
  detailContainer: {
    padding: normalize(15),
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: fonts.MEDIUM,
    color: colors.BLACK,
    fontSize: normalize(16),
  },
  viewStyle: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(12),
    marginVertical: normalize(7),
  },
  userDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicContainer: {
    height: normalize(30),
    width: normalize(30),
    borderRadius: normalize(16),
    marginRight: normalize(10),
    overflow: 'hidden',
  },
  profilePicStyle: {
    height: '100%',
    width: '100%',
  },
  profileNameText: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(13),
  },
  playIcon: {position: 'absolute', height: '100%', width: '100%'},
  timeStampContainer: {
    backgroundColor: colors.BLACK_50,
    padding: normalize(8),
    paddingVertical: normalize(4),
    borderRadius: normalize(5),
    position: 'absolute',
    bottom: '4%',
    right: '2%',
  },
  timeStamp: {
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
    fontSize: normalize(12),
  },
  titleshimmerContainer: {
    height: normalize(20),
    width: '100%',
    overflow: 'hidden',
    borderRadius: normalize(5),
  },
  timeshimmerContainer: {
    height: normalize(20),
    width: '70%',
    overflow: 'hidden',
    borderRadius: normalize(5),
    marginVertical: normalize(7),
  },
});
