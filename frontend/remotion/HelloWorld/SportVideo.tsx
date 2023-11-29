// https://www.youtube.com/embed/xSRv_6bn6Do?si=y5xZSbKwqLInteCd

import { AbsoluteFill, Video } from "remotion";
 
type VideoProps = {
  videoURL: string;
};
 
export const SportVideo: React.FC<VideoProps> = ({ videoURL }) => {
  return (
    <AbsoluteFill>
      <Video src={videoURL} />
    </AbsoluteFill>
  );
};