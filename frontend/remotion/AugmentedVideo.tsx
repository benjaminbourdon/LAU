import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import Title from "./Title";
import { Teams } from "@/client";

type videoMetadataType = {
  titleText: string;
  titleColor: string;
  urlVideo: string;
  teams: Teams;
};

export default function AugmentedVideo({
  titleText,
  titleColor,
  urlVideo,
  teams,
}: videoMetadataType) {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade out the animation at the end
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames - 5],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "grey" }}>
      <AbsoluteFill style={{ opacity }}>
        <AbsoluteFill>
          <Video src={urlVideo} disablePictureInPicture pauseWhenBuffering />
        </AbsoluteFill>

        <Sequence from={35} durationInFrames={180}>
          <Title titleText={titleText} titleColor={titleColor} />
        </Sequence>
        <Sequence from={150}>
          <p style={{ fontSize: 100 }}>
            {teams.dark.name} contre {teams.light.name}
          </p>
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
