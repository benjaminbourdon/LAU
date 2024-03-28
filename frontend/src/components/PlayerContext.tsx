import { PlayerRef } from "@remotion/player";
import React, { createContext, createRef } from "react";

const playerRef = createRef<PlayerRef>();
export const PlayerContext =
  createContext<React.RefObject<PlayerRef>>(playerRef);
