import {FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mediaJSON} from '../../../utils/dummyData';
import {mediaJSONProps} from '../../../utils/modals';
import {normalize} from '../../../utils/dimensions';
import FeedCard from '../../../components/feedCard';
import {navigationRef} from '../../../utils/common';
import screenNames from '../../../utils/screenNames';

const Videos = () => {
  const insets = useSafeAreaInsets();
  const [page, setPage] = React.useState(1);
  const [data, getData] = React.useState<mediaJSONProps[] | []>([]);

  useEffect(() => {
    getData([...data, ...mediaJSON.slice(3 * (page - 1), 3 * page)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderCard = ({item}: {item: mediaJSONProps}) => {
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
        uploadedAt={item.uploadedAt}
        views={item.views}
        duration={item.duration}
        onPress={navigateTo}
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
    />
  );
};

export default React.memo(Videos);
