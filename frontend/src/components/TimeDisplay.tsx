import React from "react";
import { PlayerRef } from "@remotion/player";
import { useCurrentPlayerFrame } from "../../remotion/use-current-player-frame";

export default function TimeDisplay({
  playerRef,
}: {
  playerRef: React.RefObject<PlayerRef>;
}) {
  const frame = useCurrentPlayerFrame(playerRef);

  return <div>current frame: {frame}</div>;
}
