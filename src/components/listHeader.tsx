import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {reactions} from '../utils/dummyData';
import {normalize} from '../utils/dimensions';
import fonts from '../utils/fonts';
import colors from '../utils/colors';
import localimages from '../utils/localimages';
import {mediaJSONProps} from '../utils/modals';

const ListHeader = ({data}: {data: mediaJSONProps}) => {
  return (
    <React.Fragment>
      <View style={styles.detailsContainer}>
        <Text style={styles.titleText}>{data?.title}</Text>
        <Text
          style={
            styles.viewcount
          }>{`${data?.views}  \u2022  ${data?.uploadedAt}`}</Text>
        <Text numberOfLines={3} style={styles.descriptionText}>
          {data?.description}
        </Text>
        <View style={styles.reactionsParentContainer}>
          {reactions.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                key={index}
                style={styles.reacttionSubContainer}>
                <Image source={item.icon} style={styles.reactionIcon} />
                <Text style={styles.reactionText}>{item.text}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.channelDescriptionParentContainer}>
        <View style={styles.channelDescriptionView}>
          <Image source={localimages.PROFILEPIC} style={styles.channelIcon} />
          <View style={styles.channelDetails}>
            <Text style={styles.channelName}>{'Technical Guruji'}</Text>
            <Text style={styles.subscriberText}>{'15k Subscribers'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.subscribeButton}>
          <Text style={styles.subscribeText}>{'Subscribe'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.commentContainer}>
        <View style={styles.countContainer}>
          <Text style={styles.commentHeader}>
            {'Comments'}
            <Text style={styles.commentCount}>{'   32'}</Text>
          </Text>
          <Image source={localimages.EXPAND} style={styles.expandIcon} />
        </View>
        <View style={styles.channelDescriptionView}>
          <Image source={localimages.PROFILEPIC} style={styles.commentIcon} />
          <Text style={styles.commentText}>
            {
              'This video is so good. I learnt lots of things in this video. Thanks tech for sharing it.'
            }
          </Text>
        </View>
      </View>
      <Text style={styles.similarVideos}>{'Similar Videos'}</Text>
    </React.Fragment>
  );
};

export default React.memo(ListHeader);

const styles = StyleSheet.create({
  detailsContainer: {
    padding: normalize(15),
  },
  titleText: {
    fontSize: normalize(16),
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
  viewcount: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(12),
    marginVertical: normalize(7),
  },
  descriptionText: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(12),
  },
  reactionsParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(25),
  },
  reacttionSubContainer: {
    alignItems: 'center',
    height: normalize(45),
    justifyContent: 'space-between',
    width: normalize(50),
  },
  reactionIcon: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  reactionText: {
    fontSize: normalize(11),
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
  },
  channelDescriptionParentContainer: {
    borderTopWidth: normalize(1),
    borderBottomWidth: normalize(1),
    borderColor: colors.BORDER,
    padding: normalize(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  channelDescriptionView: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  channelDetails: {
    marginLeft: normalize(10),
    justifyContent: 'space-between',
  },
  channelIcon: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(20),
  },
  subscribeButton: {
    paddingHorizontal: normalize(26),
    paddingVertical: normalize(6),
    borderRadius: normalize(18),
    backgroundColor: colors.CYAN,
  },
  subscribeText: {
    fontSize: normalize(12),
    color: colors.WHITE,
    fontFamily: fonts.MEDIUM,
  },
  channelName: {
    fontSize: normalize(14),
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
  },
  subscriberText: {
    fontSize: normalize(12),
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
  },
  commentContainer: {
    padding: normalize(15),
    borderBottomWidth: normalize(1),
    borderColor: colors.BORDER,
    marginBottom: normalize(18),
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: normalize(10),
  },
  commentHeader: {
    fontSize: normalize(12),
    fontFamily: fonts.SEMIBOLD,
    color: colors.BLACK,
  },
  commentCount: {
    fontSize: normalize(12),
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
  },
  expandIcon: {height: normalize(18), width: normalize(11)},
  commentIcon: {
    height: normalize(28),
    width: normalize(28),
    borderRadius: normalize(15),
    marginRight: normalize(12),
  },
  commentText: {
    fontFamily: fonts.MEDIUM,
    color: colors.LIGHTGREY,
    fontSize: normalize(10),
    lineHeight: normalize(16),
    flex: 1,
  },
  similarVideos: {
    fontSize: normalize(14),
    fontFamily: fonts.BOLD,
    color: colors.BLACK,
    marginHorizontal: normalize(15),
  },
});
