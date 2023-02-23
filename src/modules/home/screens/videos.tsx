import {FlatList} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mediaJSON} from '../../../utils/dummyData';
import {mediaJSONProps} from '../../../utils/modals';
import {normalize} from '../../../utils/dimensions';
import FeedCard from '../../../components/feedCard';
import {navigationRef} from '../../../utils/common';
import screenNames from '../../../utils/screenNames';

const Videos = () => {
  const insets = useSafeAreaInsets();

  const renderCard = ({item}: {item: mediaJSONProps}) => {
    const navigateTo = () => {
      navigationRef.current.navigate(screenNames.PLAYER, {
        source: item.sources[0],
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
        onPress={navigateTo}
      />
    );
  };

  const keyExtrat = (item: mediaJSONProps, index: number) => index.toString();

  return (
    <FlatList
      data={mediaJSON}
      contentContainerStyle={{paddingBottom: normalize(insets.bottom)}}
      keyExtractor={keyExtrat}
      renderItem={renderCard}
    />
  );
};

export default React.memo(Videos);
