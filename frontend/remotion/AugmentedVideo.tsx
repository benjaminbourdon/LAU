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
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const videoMetadataSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  urlVideo: z.string(),
});

export default function AugmentedVideo({
  titleText,
  titleColor,
  urlVideo,
}: z.infer<typeof videoMetadataSchema>) {
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
          <Video src={urlVideo} disablePictureInPicture />
        </AbsoluteFill>

        <Sequence from={35}>
          <Title titleText={titleText} titleColor={titleColor} />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
