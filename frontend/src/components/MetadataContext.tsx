"use client";

import { Team, VideoOut } from "@/client";
import { createDefinedContext } from "@/hooks/context";
import { Dispatch, useReducer } from "react";

export const MetadataContext = createDefinedContext<VideoOut>();
export const MetadataDispatchContext =
  createDefinedContext<Dispatch<MetadataAction>>();

export function MetadataProvider({
  children,
  initialValue,
}: {
  children: React.ReactNode;
  initialValue?: VideoOut;
}) {
  const initialData = initialValue ? initialValue : defaultVideoData;

  const [videoMetadata, metadataDispatch] = useReducer(
    metadataReducer,
    initialData,
  );

  return (
    <MetadataContext.Provider value={videoMetadata}>
      <MetadataDispatchContext.Provider value={metadataDispatch}>
        {children}
      </MetadataDispatchContext.Provider>
    </MetadataContext.Provider>
  );
}

export type MetadataAction =
  | { target: "event" | "src"; value: string }
  | { target: "teams"; team: "dark" | "light"; value: Team };

function metadataReducer(metadata: VideoOut, action: MetadataAction) {
  switch (action.target) {
    case "event":
    case "src":
      return { ...metadata, [action.target]: action.value };
    case "teams": {
      return {
        ...metadata,
        teams: { ...metadata.teams, [action.team]: action.value },
      };
    }
  }
}

const defaultVideoData: VideoOut = {
  src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  event: "Championnat",
  teams: {
    dark: {
      name: "Équipe sombre",
      color: "black",
    },
    light: {
      name: "Équipe claire",
      color: "white",
    },
  },
  perma_token: "",
};
