import {StyleSheet, Text, View, NativeModules, Image} from 'react-native';
import React from 'react';
import colors from '../../../utils/colors';
import {mediaJSONProps} from '../../../utils/modals';
import Video from 'react-native-video';
import {navigationRef} from '../../../utils/common';
import {normalize} from '../../../utils/dimensions';
import fonts from '../../../utils/fonts';
import {reactions} from '../../../utils/dummyData';

const PlayerScreen = ({route}: any) => {
  const {StatusBarManager} = NativeModules;
  const {data, source}: {data: mediaJSONProps; source: string} = route?.params;
  console.log('source', source);
  const [pause, setPaused] = React.useState(true);
  React.useEffect(() => {
    setPaused(false);
    return () => {
      setPaused(true);
    };
  }, []);
  return (
    <View
      style={[styles.parentContainer, {paddingTop: StatusBarManager?.HEIGHT}]}>
      {/* To be Removed */}
      <Text
        onPress={() => {
          navigationRef.current.goBack();
        }}>
        back
      </Text>
      <Video
        style={{width: '100%', aspectRatio: 1 / 0.557}}
        resizeMode={'cover'}
        source={{uri: source}}
        muted={true}
        paused={pause}
      />
      {/* --------------------------- */}
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
              <View key={index} style={styles.reacttionSubContainer}>
                <Image source={item.icon} style={styles.reactionIcon} />
                <Text style={styles.reactionText}>{item.text}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default React.memo(PlayerScreen);

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
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
});
