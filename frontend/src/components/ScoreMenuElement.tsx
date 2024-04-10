"use client";

import { Button } from "@nextui-org/button";
import { UUID } from "crypto";
import { useContext } from "react";

import { useDefinedContext } from "@/hooks/context";
import { MetadataContext } from "./MetadataContext";
import { PlayerContext } from "./PlayerContext";
import { Point } from "./ScoreMenu";

export default function ScoreMenuElement({
  point,
  isActive,
  onDelete,
}: {
  point: Point;
  isActive: boolean;
  onDelete: (id: UUID) => void;
}) {
  const style = isActive ? "bg-primary-100" : "bg-default-100";
  const playerRef = useContext(PlayerContext);
  const { teams } = useDefinedContext(MetadataContext);

  function goToStartingFrame() {
    if (playerRef.current) {
      playerRef.current.seekTo(point.start);
      playerRef.current.pause();
    }
  }

  const isClosed = point.end !== undefined;

  return (
    <li className={style + " flex flex-row gap-4 p-2"}>
      <p className="grow flex flex-row">
        <span className="w-1/6">{"Début : " + point.start + "\n"}</span>
        <span className="w-1/6">
          {isClosed ? "Fin : " + point.end + "\n" : null}
        </span>
        <span className="w-1/3">
          {isClosed && point.scoringTeam !== undefined
            ? "Point marqué par " + teams[point.scoringTeam].name
            : "Point non fini"}
        </span>
      </p>
      <Button onPress={goToStartingFrame} variant="flat">
        Y aller
      </Button>
      <Button onPress={() => onDelete(point.id)} variant="ghost" color="danger">
        Supprimer
      </Button>
    </li>
  );
}
