"use client";

import ActionButton from "@/components/ActionButton";
import Input from "@/components/Input";
import InputContainer from "@/components/InputContainer";
import { Player, PlayerRef } from "@remotion/player";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import AugmentedVideo from "../../remotion/AugmentedVideo";
import TimeDisplay from "../../remotion/TimeDisplay";
import { api } from "../client";

export default function InterractivePlayer() {
  const router = useRouter();
  const { videoId } = useParams<{ videoId?: Array<string> }>();
  const [title, setTitle] = useState<string>("Titre match");
  const urlSample =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  const [urlVideo, setUrlVideo] = useState<string>(urlSample);
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    async function sync_video_data(video_uuid: string) {
      try {
        const response = await api.ReadVideoGet({
          params: {
            perma_token: video_uuid,
          },
        });
        if (response.title) {
          setTitle(response.title);
        }
        setUrlVideo(response.src);
      } catch (error) {
        router.replace("/lecteur");
      }
    }
    if (videoId) {
      sync_video_data(videoId[0]);
    }
  }, [videoId]);

  const handleClick: React.MouseEventHandler = async () => {
    const data = { title: title, src: urlVideo };
    if (videoId) {
      const res = await api.ReplaceVideoPut(data, {
        params: { perma_token: videoId[0] },
      });
    } else {
      const res = await api.CreateVideoPost(data);
      console.log(res.perma_token);
      router.push("/lecteur/" + res.perma_token);
    }
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
