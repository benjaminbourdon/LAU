import { Player, PlayerRef } from "@remotion/player";
import { AugmentedVideo } from "./AugmentedVideo";
import { useRef } from "react";
import { TimeDisplay } from "./TimeDisplay";

export const MyPlayer: React.FC<{
  titleText: string;
}> = ({ titleText }) => {
  const playerRef = useRef<PlayerRef>(null);

  const durationInFrames = 1800;
  return (
    <>
      <Player
        ref={playerRef}
        component={AugmentedVideo}
        inputProps={{
          titleText: titleText,
          titleColor: "black",
          urlVideo:
            // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            "https://peertube.iriseden.eu/download/videos/8d2d2c91-caff-4cbd-84d9-da197dab7587-144.mp4",
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
      <TimeDisplay playerRef={playerRef} />
    </>
  );
};
