import { Player } from "@remotion/player";
import { AugmentedVideo } from "./AugmentedVideo";

export const MyPlayer: React.FC<{
  titleText: string;
}> = ({ titleText }) => {
  const durationInFrames = 1800;
  return (
    <Player
      component={AugmentedVideo}
      inputProps={{
        titleText: titleText,
        titleColor: "black",
        urlVideo:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      }}
      durationInFrames={durationInFrames}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{
        width: 960,
        height: 540,
      }}
      inFrame={20}
      outFrame={durationInFrames - 20}
      controls
    />
  );
};
