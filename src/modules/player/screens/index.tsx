import {StyleSheet, View, NativeModules, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
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
  let media = mediaJSON
    .filter((item: mediaJSONProps) => item.id !== currentData.id)
    .splice(0, 5);

  useEffect(() => {
    Orientation.addDeviceOrientationListener(orientation => {
      if (orientation.includes('PORTRAIT')) {
        setStatusBarPadding({paddingTop: StatusBarManager?.HEIGHT});
      } else {
        setStatusBarPadding(0);
      }
    });
  }, []);

  const keyExtrat = (item: mediaJSONProps, index: number) => index.toString();

  const renderCard = ({item}: {item: mediaJSONProps}) => {
    const onPress = () => {
      setCurrentData(item);
    };

    return (
      <FeedCard
        title={item.title}
        subtitle={item.subtitle}
        thumb={item.thumb}
        uploadedAt={item.uploadedAt}
        views={item.views}
        onPress={onPress}
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
        data={media}
        renderItem={renderCard}
        keyExtractor={keyExtrat}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{paddingBottom: normalize(insets.bottom)}}
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
