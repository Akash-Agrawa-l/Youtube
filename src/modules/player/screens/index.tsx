import {StyleSheet, View, NativeModules, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../../../utils/colors';
import {mediaJSONProps} from '../../../utils/modals';
import {mediaJSON} from '../../../utils/dummyData';
import ListHeader from '../../../components/listHeader';
import FeedCard from '../../../components/feedCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from '../../../utils/dimensions';
import VideoComponent from '../../../components/videoComponent';
import Orientation from 'react-native-orientation-locker';

const PlayerScreen = ({route}: any) => {
  const {StatusBarManager} = NativeModules;
  const insets = useSafeAreaInsets();
  const {data}: {data: mediaJSONProps} = route?.params;
  const [currentData, setCurrentData] = useState(data);
  const [statusBarPadding, setStatusBarPadding] = useState({
    paddingTop: StatusBarManager?.HEIGHT,
  });
  const flatlistRef = useRef<any>();
  let media = mediaJSON
    .filter((item: mediaJSONProps) => item.id !== currentData.id)
    .splice(0, 5);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation.includes('PORTRAIT')) {
        setStatusBarPadding({paddingTop: StatusBarManager?.HEIGHT});
      } else {
        setStatusBarPadding({paddingTop: 0});
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const keyExtrat = (item: mediaJSONProps, index: number) => index.toString();

  const onPress = (item: mediaJSONProps) => {
    flatlistRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCurrentData(item);
  };

  const renderCard = ({item}: {item: mediaJSONProps}) => {
    return (
      <FeedCard
        title={item.title}
        subtitle={item.subtitle}
        thumb={item.thumb}
        uploadedAt={item.uploadedAt}
        views={item.views}
        onPress={() => onPress(item)}
      />
    );
  };

  const renderHeader = () => {
    return <ListHeader data={currentData} />;
  };

  return (
    <View style={[styles.parentContainer, statusBarPadding]}>
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
});
