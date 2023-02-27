import React from 'react';

export const navigationRef = React.createRef<any>();
export const vidRef = React.createRef<any>();

export const formatTime = (time: number) => {
  const minutes = time >= 60 ? Math.floor(time / 60) : 0;
  const seconds = Math.floor(time % 60);

  return `${minutes >= 10 ? minutes : '0' + minutes}:${
    seconds >= 10 ? seconds : '0' + seconds
  }`;
};
