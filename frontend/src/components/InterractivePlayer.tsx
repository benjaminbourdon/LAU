"use client";

import { Player } from "@remotion/player";
import React, { useContext, useMemo } from "react";

import AugmentedVideo from "../../remotion/AugmentedVideo";
import { PlayerContext } from "./PlayerContext";
import TimeDisplay from "./TimeDisplay";
import ScoreMenu from "./ScoreMenu";
import { MetadataContext } from "./MetadataContext";
import MetadataForm from "./MetadataForm";
import { useDefinedContext } from "@/hooks/context";

export default function InterractivePlayer() {
  const playerRef = useContext(PlayerContext);

  const videoMetadata = useDefinedContext(MetadataContext);

  const inputProps = useMemo(() => {
    return {
      titleText: videoMetadata.event,
      titleColor: "black",
      urlVideo: videoMetadata.src,
      teams: videoMetadata.teams,
    };
  }, [videoMetadata]);

  return (
    <div className="w-min m-auto">
      <div className="m-2 p-2">
        <Player
          ref={playerRef}
          component={AugmentedVideo}
          inputProps={inputProps}
          durationInFrames={1800}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={30}
          style={{
            width: 960,
            height: 540,
          }}
          controls
        />
        <TimeDisplay playerRef={playerRef} />
      </div>
      <ScoreMenu teams={videoMetadata.teams} />
      <MetadataForm />
    </div>
  );
}
