import React from "react";
import { Composition } from "remotion";
import { AugmentedVideo } from "./AugmentedVideo";

export const MyFirstVideo: React.FC = () => {
  return (
    <>
      <Composition
        id="Base"
        component={AugmentedVideo}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          titleText: "Match Équipe A contre Équipe B",
          titleColor: "black",
          urlVideo:
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
      />
    </>
  );
};
