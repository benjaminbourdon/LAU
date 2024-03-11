"use client";

import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/Input";
import { InputContainer } from "@/components/InputContainer";
import { AugmentedVideo } from "../../remotion/AugmentedVideo";

import { Player, PlayerRef } from "@remotion/player";
import React, { useRef, useState } from "react";
import { TimeDisplay } from "../../remotion/TimeDisplay";
import { useCurrentPlayerFrame } from "../../remotion/use-current-player-frame";

export default function InterractivePlayer() {
  const [title, setTitle] = useState<string>("Titre match");

  const playerRef = useRef<PlayerRef>(null);

  const urlSample =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const [urlVideo, setUrlVideo] = useState<string>(urlSample);

  const handleClick: React.MouseEventHandler = async () => {
    const data = { title: title, src: urlVideo };
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };

  return (
    <>
      <Player
        ref={playerRef}
        component={AugmentedVideo}
        inputProps={{
          titleText: title,
          titleColor: "black",
          urlVideo: urlVideo,
        }}
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
      <InputContainer>
        <Input text={title} setText={setTitle}></Input>
        <Input text={urlVideo} setText={setUrlVideo}></Input>
        <ActionButton text="Enregistrer" action={handleClick}></ActionButton>
      </InputContainer>
    </>
  );
}
