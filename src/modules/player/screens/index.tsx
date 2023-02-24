import {StyleSheet, Text, View, NativeModules, FlatList} from 'react-native';
import React, {useState} from 'react';
import colors from '../../../utils/colors';
import {mediaJSONProps} from '../../../utils/modals';
import Video from 'react-native-video';
import {navigationRef} from '../../../utils/common';
import {mediaJSON} from '../../../utils/dummyData';
import ListHeader from '../../../components/listHeader';
import FeedCard from '../../../components/feedCard';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {normalize} from '../../../utils/dimensions';

const PlayerScreen = ({route}: any) => {
  const {StatusBarManager} = NativeModules;
  const insets = useSafeAreaInsets();
  const {data}: {data: mediaJSONProps; source: string} = route?.params;
  const [currentData, setCurrentData] = useState(data);
  let media = mediaJSON
    .filter((item: mediaJSONProps) => item.id !== currentData.id)
    .splice(0, 5);

  //   To be Removed
  const [pause, setPaused] = React.useState(true);
  React.useEffect(() => {
    setPaused(false);
    return () => {
      setPaused(true);
    };
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
    <View
      style={[
        styles.parentContainer,
        {
          paddingTop: StatusBarManager?.HEIGHT,
        },
      ]}>
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
        source={{uri: currentData.sources[0]}}
        muted={true}
        paused={pause}
      />
      {/* --------------------------- */}

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
