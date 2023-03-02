import {ImageSourcePropType} from 'react-native';

export interface mediaJSONProps {
  id: number;
  thumb: string;
  title: string;
  views: string;
  subtitle: string;
  duration: string;
  sources: string[];
  uploadedAt: string;
  description: string;
}

export interface cardProps {
  title: string;
  thumb: string;
  views: string;
  index?: number;
  source?: string;
  subtitle: string;
  duration: string;
  uploadedAt: string;
  onPress?: () => void;
  currentIndex?: number | null;
}

export interface VideoProps {
  source: string;
}

export interface controlProps {
  duration: number;
  timeStamp: string;
  currenttime: number;
  isFullscreen: boolean;
  handleBack: () => void;
  handlePause: () => void;
  handlerewind: () => void;
  handleForward: () => void;
  handleFullScreen: () => void;
  pauseIcon: ImageSourcePropType;
  handleSeek: (value: number) => void;
  handleCurrentTime: (value: number) => void;
}
