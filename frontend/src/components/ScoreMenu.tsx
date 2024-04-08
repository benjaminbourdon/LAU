import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useCurrentPlayerFrame } from "../../remotion/use-current-player-frame";
import ScoreMenuElement from "./ScoreMenuElement";
import { PlayerContext } from "./PlayerContext";
import { Button, ButtonGroup } from "@nextui-org/button";
import { PressEvent } from "@react-types/shared";
import { Teams } from "@/client";

export interface Point {
  id: ID;
  start: number;
  end?: number;
  scoringTeam?: "dark" | "light";
}

type ID = number;

export default function ScoreMenu({ teams }: { teams: Teams }) {
  const playerRef = useContext(PlayerContext);
  const frame = useCurrentPlayerFrame(playerRef);
  const [listPoints, setListPoints] = useState<Point[]>([]);
  const [displayedPointID, setDisplayedPointID] = useState<ID | null>(null);

  useEffect(() => {
    const nearestBeforePoint = [...listPoints]
      .filter((point) => point.start <= frame)
      .sort((a, b) => b.start - a.start)[0];

    const newCurrentPointID =
      nearestBeforePoint &&
      (!nearestBeforePoint.end || nearestBeforePoint.end >= frame)
        ? nearestBeforePoint.id
        : null;

    setDisplayedPointID(newCurrentPointID);
  }, [frame, listPoints]);

  const addStartingPoint = useCallback(() => {
    if (displayedPointID == null && playerRef.current) {
      const newScore: Point = {
        id: Date.now(),
        start: playerRef.current.getCurrentFrame(),
      };
      setListPoints((lp) =>
        [...lp, newScore].sort((a, b) => a.start - b.start),
      );
    }
  }, [playerRef, displayedPointID]);

  const closeCurrentPoint = useCallback(
    (e: PressEvent) => {
      if (!playerRef.current) {
        return;
      }

      function updater(lp: Point[]) {
        return lp
          .map((point) => {
            if (point.id === displayedPointID) {
              point.end = playerRef.current?.getCurrentFrame();
              if (
                e.target instanceof HTMLButtonElement &&
                e.target.dataset.team
              ) {
                point.scoringTeam =
                  e.target.dataset.team === "dark" ? "dark" : "light";
              }
            }
            return point;
          })
          .sort((a, b) => a.start - b.start);
      }

      setListPoints(updater);
    },
    [playerRef, displayedPointID],
  );

  const goToFrame = useCallback(
    (e: PressEvent) => {
      if (e.target instanceof HTMLButtonElement && e.target.dataset.frame) {
        if (playerRef.current) {
          const targetFrame = Number(e.target.dataset.frame);
          playerRef.current.seekTo(targetFrame);
          playerRef.current.pause();
        }
      }
    },
    [playerRef],
  );

  const deletePoint = useCallback((e: PressEvent) => {
    if (e.target instanceof HTMLButtonElement && e.target.dataset.pointId) {
      const pointId = Number(e.target.dataset.pointId);
      setListPoints((lp) => lp.filter((elem) => elem.id !== pointId));
    }
  }, []);

  const currentPoint = useMemo(
    () =>
      displayedPointID != null
        ? listPoints.find((point) => point.id === displayedPointID)
        : null,
    [displayedPointID, listPoints],
  );
  const isPointOpened = useMemo(
    () => currentPoint !== null && currentPoint !== undefined,
    [currentPoint],
  );
  const isPointClosed = currentPoint?.end !== undefined;

  return (
    <div className="border-4 rounded p-2 m-2">
      <div className="m-2 flex gap-4">
        <Button onPress={addStartingPoint} isDisabled={isPointOpened}>
          Débuter un point
        </Button>
        <ButtonGroup>
          <Button
            onPress={closeCurrentPoint}
            data-team={"dark"}
            isDisabled={!isPointOpened || isPointClosed}
          >
            {"Point marqué par " + teams.dark.name}
          </Button>
          <Button
            onPress={closeCurrentPoint}
            data-team={"light"}
            isDisabled={!isPointOpened || isPointClosed}
          >
            {"Point marqué par " + teams.light.name}
          </Button>
        </ButtonGroup>
      </div>
      <ul className="flex flex-col gap-1">
        {listPoints.map((point) => (
          <ScoreMenuElement
            key={point.id}
            point={point}
            isActive={point.id === displayedPointID}
            onDelete={deletePoint}
            goTo={goToFrame}
          />
        ))}
      </ul>
    </div>
  );
}
