import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {cardProps} from '../utils/modals';
import {normalize} from '../utils/dimensions';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import localimages from '../utils/localimages';

const FeedCard = ({
  title,
  subtitle,
  thumb,
  uploadedAt,
  views,
  onPress,
}: cardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={styles.cardContainerStyle}>
      <View>
        <Image
          source={{uri: thumb}}
          resizeMode={'cover'}
          style={styles.thumbImageStyle}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text
          style={styles.viewStyle}>{`${views}  \u2022  ${uploadedAt}`}</Text>
        <View style={styles.userDetailContainer}>
          <Image
            source={localimages.PROFILEPIC}
            style={styles.profilePicStyle}
          />
          <Text style={styles.profileNameText}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedCard;

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
  thumbImageStyle: {
    width: '100%',
    aspectRatio: 1 / 0.563,
    borderTopRightRadius: normalize(10),
    borderTopLeftRadius: normalize(10),
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
  profilePicStyle: {
    height: normalize(30),
    width: normalize(30),
    borderRadius: normalize(16),
    marginRight: normalize(10),
  },
  profileNameText: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(13),
  },
});
