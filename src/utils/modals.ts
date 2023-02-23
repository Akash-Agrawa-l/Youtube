export interface mediaJSONProps {
    id: number;
    uploadedAt: string;
    views: string;
    description: string;
    sources: string[];
    subtitle: string;
    thumb: string;
    title: string;
  }

  export interface cardProps{
    title: string,
    subtitle: string;
    thumb: string;
    uploadedAt: string;
    views: string;
    onPress?: ()=>void,
  }