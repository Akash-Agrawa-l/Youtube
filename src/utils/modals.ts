import {ImageSourcePropType} from 'react-native';

export interface mediaJSONProps {
  id: number;
  uploadedAt: string;
  views: string;
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
  duration: string;
}

export interface cardProps {
  title: string;
  subtitle: string;
  thumb: string;
  uploadedAt: string;
  views: string;
  duration: string;
  onPress?: () => void;
}

export interface VideoProps {
  source: string;
}

export interface controlProps {
  handleBack: () => void;
  handlerewind: () => void;
  handlePause: () => void;
  handleForward: () => void;
  handleSeek: (value: number) => void;
  handleCurrentTime: (value: number) => void;
  handleFullScreen: () => void;
  timeStamp: string;
  duration: number;
  currenttime: number;
  isFullscreen: boolean;
  pauseIcon: ImageSourcePropType;
}
