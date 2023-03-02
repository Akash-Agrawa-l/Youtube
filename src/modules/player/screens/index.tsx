import {
  StyleSheet,
  View,
  NativeModules,
  FlatList,
  ViewStyle,
  StatusBar,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import colors from '../../../utils/colors';
import {mediaJSON} from '../../../utils/dummyData';
import FeedCard from '../../../components/feedCard';
import {normalize} from '../../../utils/dimensions';
import {mediaJSONProps} from '../../../utils/modals';
import ListHeader from '../../../components/listHeader';
import VideoComponent from '../../../components/videoComponent';

const {StatusBarManager} = NativeModules;

const PlayerScreen = () => {
  const insets = useSafeAreaInsets();
  const route: any = useRoute();
  const {data}: {data: mediaJSONProps} = route.params;
  const [currentData, setCurrentData] = useState<mediaJSONProps>(data);
  const [statusBarPadding, setStatusBarPadding] = useState<ViewStyle>(
    styles.statusBarPadding,
  );
  const flatlistRef = useRef<any>();
  let media: mediaJSONProps[] = mediaJSON
    .filter((item: mediaJSONProps) => item.id !== currentData.id)
    .splice(0, 5);

  const isFullscreen: boolean = statusBarPadding === styles.noPadding;

  useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation === 'PORTRAIT') {
        setStatusBarPadding(styles.statusBarPadding);
      } else {
        setStatusBarPadding(styles.noPadding);
      }
    });
  }, []);

  const keyExtrat = (item: mediaJSONProps, index: number) => index.toString();

  const renderCard = ({item}: {item: mediaJSONProps}) => {
    const onPress = () => {
      flatlistRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCurrentData(item);
    };
    return (
      <FeedCard
        title={item.title}
        subtitle={item.subtitle}
        thumb={item.thumb}
        duration={item.duration}
        uploadedAt={item.uploadedAt}
        views={item.views}
        onPress={onPress}
      />
    );
  };

  const renderHeader = useCallback(() => {
    return <ListHeader data={currentData} />;
  }, [currentData]);

  return (
    <View style={[styles.parentContainer, statusBarPadding]}>
      {isFullscreen && <StatusBar hidden barStyle={'light-content'} />}
      <VideoComponent source={currentData.sources[0]} />
      <FlatList
        ref={flatlistRef}
        data={media}
        renderItem={renderCard}
        keyExtractor={keyExtrat}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingBottom: normalize(insets.bottom + 10)}}
        scrollsToTop={true}
        bounces={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default React.memo(PlayerScreen);

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  statusBarPadding: {
    paddingTop: StatusBarManager?.HEIGHT,
  },
  noPadding: {
    paddingTop: 0,
  },
});
