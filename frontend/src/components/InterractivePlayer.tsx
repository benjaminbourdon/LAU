"use client";

import { ActionButton } from "@/components/ActionButton";
import { Input } from "@/components/Input";
import { InputContainer } from "@/components/InputContainer";
import { AugmentedVideo } from "../../remotion/AugmentedVideo";
import { useParams, useRouter } from "next/navigation";

import { Player, PlayerRef } from "@remotion/player";
import React, { useRef, useState, useEffect } from "react";
import { TimeDisplay } from "../../remotion/TimeDisplay";
import { ApiError, VideoService } from "../client";

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
      try {
        const response = await VideoService.readVideoGet({
          permaToken: video_uuid,
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
      sync_video_data(videoId);
    }
  }, [videoId]);

  const handleClick: React.MouseEventHandler = async () => {
    const method = videoId ? "PUT" : "POST";
    const entrypoint = videoId ? "/video/" + videoId : "/video";
    const data = { title: title, src: urlVideo };
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASEURL + entrypoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!videoId) {
      const data_published = await res.json();
      router.push("/lecteur/" + data_published.perma_token);
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
