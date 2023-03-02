import {FlatList, ViewToken} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mediaJSON} from '../../../utils/dummyData';
import {normalize} from '../../../utils/dimensions';
import FeedCard from '../../../components/feedCard';
import {navigationRef} from '../../../utils/common';
import {mediaJSONProps} from '../../../utils/modals';
import screenNames from '../../../utils/screenNames';

const Videos = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(1);
  const [data, getData] = React.useState<mediaJSONProps[] | []>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setTimeout(() => {
      setCurrentIndex(0);
    }, 6000);
  }, []);

  const viewabilityConfig = {
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 50,
  };

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: Array<ViewToken>}) => {
      setTimeout(() => {
        setCurrentIndex(viewableItems[0]?.index);
      }, 1000);
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
