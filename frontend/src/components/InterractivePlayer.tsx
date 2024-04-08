"use client";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Player } from "@remotion/player";
import { useParams, useRouter } from "next/navigation";
import React, { useCallback, useContext, useMemo, useState } from "react";

import AugmentedVideo from "../../remotion/AugmentedVideo";
import { VideoService, VideoOut, Teams } from "../client";
import { PlayerContext } from "./PlayerContext";
import TimeDisplay from "./TimeDisplay";
import ScoreMenu from "./ScoreMenu";

export default function InterractivePlayer({
  initialData,
}: {
  initialData?: VideoOut;
}) {
  const router = useRouter();
  const playerRef = useContext(PlayerContext);
  const { videoId } = useParams<{ videoId?: Array<string> }>();

  const [eventTitle, setEventTitle] = useState<string>(
    initialData?.event ? initialData.event : "Pas de titre par défaut",
  );
  const [urlVideo, setUrlVideo] = useState<string>(
    initialData?.src ? initialData.src : "",
  );
  const [teams, setTeams] = useState<Teams>(
    initialData?.teams
      ? initialData.teams
      : {
          dark: {
            name: "Équipe sombre",
            color: "black",
          },
          light: {
            name: "Équipe claire",
            color: "white",
          },
        },
  );

  const inputProps = useMemo(() => {
    return {
      titleText: eventTitle,
      titleColor: "black",
      urlVideo: urlVideo,
      teams: teams,
    };
  }, [eventTitle, urlVideo, teams]);

  const onPressSaver = useCallback(async () => {
    const data = { event: eventTitle, src: urlVideo, teams: teams };
    if (videoId) {
      VideoService.replaceVideoPut({
        permaToken: videoId[0],
        requestBody: data,
      });
    } else {
      const res = await VideoService.createVideoPost({ requestBody: data });
      router.push("/lecteur/" + res.perma_token);
    }
  }, [router, eventTitle, urlVideo, videoId, teams]);

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
      <ScoreMenu teams={teams} />
      <div className="border-4 rounded p-2 m-2 grid gap-4">
        <Input
          label="Nom de l'évènement "
          value={eventTitle}
          onValueChange={setEventTitle}
        />
        <Input
          label="URL de la vidéo"
          value={urlVideo}
          onValueChange={setUrlVideo}
        />
        <Input
          label={"Nom de l'équipe foncée "}
          value={teams.dark.name}
          onValueChange={(newValue) => {
            // setTeams({
            //   ...teams,
            //   dark: { ...teams.dark, name: newValue },
            // });
            let newTeams: Teams = { ...teams };
            newTeams.dark.name = newValue;
            setTeams(newTeams);
          }}
        />
        <Input
          label={"Nom de l'équipe claire "}
          value={teams.light.name}
          onValueChange={(newValue) => {
            let newTeams: Teams = { ...teams };
            newTeams.light.name = newValue;
            setTeams(newTeams);
          }}
        />
        <Button onPress={onPressSaver} color="primary">
          Enregistrer
        </Button>
      </div>
    </div>
  );
}
