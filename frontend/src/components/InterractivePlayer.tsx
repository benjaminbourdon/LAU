"use client";

import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Player } from "@remotion/player";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { z } from "zod";

import AugmentedVideo from "../../remotion/AugmentedVideo";
import { api, schemas } from "../client";
import { PlayerContext } from "./PlayerContext";
import TimeDisplay from "./TimeDisplay";

export default function InterractivePlayer({
  initialData,
}: {
  initialData?: z.infer<typeof schemas.VideoOut>;
}) {
  const router = useRouter();
  const playerRef = useContext(PlayerContext);
  const { videoId } = useParams<{ videoId?: Array<string> }>();

  const [title, setTitle] = useState<string>(
    initialData?.title ? initialData.title : "Pas de titre par défaut",
  );
  const [urlVideo, setUrlVideo] = useState<string>(
    initialData?.src ? initialData.src : "",
  );
  const inputProps = useMemo(() => {
    return {
      titleText: title,
      titleColor: "black",
      urlVideo: urlVideo,
    };
  }, [title, urlVideo]);

  const handleClick: React.MouseEventHandler = async () => {
    const data = { title: title, src: urlVideo };
    if (videoId) {
      const res = await api.ReplaceVideoPut(data, {
        params: { perma_token: videoId[0] },
      });
    } else {
      const res = await api.CreateVideoPost(data);
      router.push("/lecteur/" + res.perma_token);
    }
  };

  return (
    <>
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
      <div>
        <Input label="Titre" value={title} onValueChange={setTitle} />
        <Input
          label="URL de la vidéo"
          value={urlVideo}
          onValueChange={setUrlVideo}
        />
        <Button onClick={handleClick} color="primary">
          Enregistrer
        </Button>
      </div>
    </>
  );
}
