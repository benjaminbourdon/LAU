"use client";

import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/Input";
import { InputContainer } from "@/components/InputContainer";
import { AugmentedVideo } from "../../remotion/AugmentedVideo";
import { useParams, useRouter } from "next/navigation";

import { Player, PlayerRef } from "@remotion/player";
import React, { useRef, useState, useEffect } from "react";
import { TimeDisplay } from "../../remotion/TimeDisplay";

export default function InterractivePlayer() {
  const router = useRouter();
  const { videoId } = useParams<{ videoId?: string }>();
  const [title, setTitle] = useState<string>("Titre match");
  const urlSample =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const [urlVideo, setUrlVideo] = useState<string>(urlSample);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    async function sync_video_data(video_uuid: string) {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASEURL + "/video/" + video_uuid,
      );
      const data = await res.json();
      if (res.status == 200) {
        setTitle(data.title);
        setUrlVideo(data.src);
      } else {
        router.replace("/lecteur");
        // Error message
      }
    }
    if (videoId) {
      sync_video_data(videoId);
    }
  }, [videoId]);

  const handleClick: React.MouseEventHandler = async () => {
    const data = { title: title, src: urlVideo };
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASEURL + "/video", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data_published = await res.json();
    router.push("/lecteur/" + data_published.perma_token);
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
