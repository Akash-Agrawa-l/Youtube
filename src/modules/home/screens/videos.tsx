import {FlatList} from 'react-native';
import React, {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {mediaJSON} from '../../../utils/dummyData';
import {mediaJSONProps} from '../../../utils/modals';
import {normalize} from '../../../utils/dimensions';
import FeedCard from '../../../components/feedCard';

const Videos = () => {
  const insets = useSafeAreaInsets();

  const renderCard = ({item}: {item: mediaJSONProps}) => {
    return (
      <FeedCard
        title={item.title}
        subtitle={item.subtitle}
        thumb={item.thumb}
        uploadedAt={item.uploadedAt}
        views={item.views}
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

export default Videos;
