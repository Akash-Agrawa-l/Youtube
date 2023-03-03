import {FlatList, ViewToken} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mediaJSON} from '../../../utils/dummyData';
import {normalize} from '../../../utils/dimensions';
import FeedCard from '../../../components/feedCard';
import {navigationRef, playRef} from '../../../utils/common';
import {mediaJSONProps} from '../../../utils/modals';
import screenNames from '../../../utils/screenNames';
import {useIsFocused} from '@react-navigation/native';

const Videos = () => {
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(1);
  const [data, getData] = React.useState<mediaJSONProps[] | []>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
    }, 3500);
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      playRef?.current?.seek(0);
      setCurrentIndex(null);
    }
  }, [isFocused]);

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 100,
    minimumViewTime: 2500,
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      setCurrentIndex(viewableItems[0]?.index);
    },
    [],
  );

  const viewabilityConfigCallbackPairs = React.useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  useEffect(() => {
    getData([...data, ...mediaJSON.slice(3 * (page - 1), 3 * page)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderCard = ({item, index}: {item: mediaJSONProps; index: number}) => {
    const navigateTo = () => {
      navigationRef.current.navigate(screenNames.PLAYER, {
        data: item,
      });
    };

    return (
      <FeedCard
        title={item.title}
        subtitle={item.subtitle}
        thumb={item.thumb}
        source={item.sources[0]}
        uploadedAt={item.uploadedAt}
        views={item.views}
        duration={item.duration}
        onPress={navigateTo}
        currentIndex={currentIndex}
        index={index}
      />
    );
  };

  const keyExtrat = (item: mediaJSONProps, index: number) => index.toString();

  const onEndReached = () => {
    if ((page - 1) * 3 <= data.length) {
      setPage(page + 1);
    }
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={{paddingBottom: normalize(insets.bottom)}}
      keyExtractor={keyExtrat}
      renderItem={renderCard}
      bounces={false}
      onEndReachedThreshold={0.3}
      onEndReached={onEndReached}
      showsVerticalScrollIndicator={false}
      maxToRenderPerBatch={3}
      windowSize={3}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    />
  );
};

export default React.memo(Videos);
