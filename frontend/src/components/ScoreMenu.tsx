"use client";

import { Button, ButtonGroup } from "@nextui-org/button";
import { UUID } from "crypto";
import { useContext, useMemo, useReducer } from "react";

import { useDefinedContext } from "@/hooks/context";
import { useCurrentPlayerFrame } from "../../remotion/use-current-player-frame";
import { MetadataContext } from "./MetadataContext";
import { PlayerContext } from "./PlayerContext";
import ScoreMenuElement from "./ScoreMenuElement";

export interface Point {
  id: UUID;
  start: number;
  end?: number;
  scoringTeam?: Hue;
}

type Hue = "dark" | "light";

export default function ScoreMenu() {
  const playerRef = useContext(PlayerContext);
  const frame = useCurrentPlayerFrame(playerRef);
  const { teams } = useDefinedContext(MetadataContext);

  const [listPoints, dispatch] = useReducer(listPointsReducer, [] as Point[]);

  // Calculate wich point is currently displayed in Player
  const { currentPointId, inPoint, inClosedPoint } = useMemo(() => {
    const nearestBeforePoint = [...listPoints]
      .filter((point) => point.start <= frame)
      .sort((a, b) => b.start - a.start)[0];

    const newCurrentPoint =
      nearestBeforePoint &&
      (!nearestBeforePoint.end || nearestBeforePoint.end >= frame)
        ? nearestBeforePoint
        : null;

    return {
      currentPointId: newCurrentPoint?.id,
      inPoint: newCurrentPoint !== null && newCurrentPoint !== undefined,
      inClosedPoint: newCurrentPoint?.end !== undefined,
    };
  }, [frame, listPoints]);

  function addStartingPoint() {
    if (inPoint) {
      console.warn("Can't start a point inside another.");
      return;
    }
    dispatch({
      type: "added",
      point: { id: crypto.randomUUID() as UUID, start: frame },
    });
  }

  function closeCurrentPoint(team: Hue) {
    return () => {
      if (!currentPointId) {
        console.warn(
          "Can't close point because no point opened at current time.",
        );
        return;
      }
      if (inClosedPoint) {
        console.warn("Can't close an already closed point.");
        return;
      }
      dispatch({
        type: "closed",
        end: frame,
        pointId: currentPointId,
        scoringTeam: team,
      });
    };
  }

  function deletePoint(pointId: UUID) {
    dispatch({ type: "deleted", pointId });
  }

  const listTeamHues: Hue[] = ["dark", "light"];

  return (
    <div className="border-4 rounded p-2 m-2">
      <div className="m-2 flex gap-4">
        <Button onPress={addStartingPoint} isDisabled={inPoint}>
          Débuter un point
        </Button>
        <ButtonGroup isDisabled={!inPoint || inClosedPoint}>
          {listTeamHues.map((hue) => (
            <Button key={hue} onPress={closeCurrentPoint(hue)}>
              {"Point marqué par " + teams[hue].name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <ul className="flex flex-col gap-1">
        {listPoints.map((point) => (
          <ScoreMenuElement
            key={point.id}
            point={point}
            isActive={point.id === currentPointId}
            onDelete={deletePoint}
          />
        ))}
      </ul>
    </div>
  );
}

type ListPointsActions =
  | { type: "added"; point: Point }
  | { type: "closed"; pointId: UUID; end: number; scoringTeam: Hue }
  | { type: "deleted"; pointId: UUID };

function listPointsReducer(listPoints: Point[], action: ListPointsActions) {
  let newListPoints = [...listPoints];
  let isSorted = true;
  switch (action.type) {
    case "added": {
      newListPoints.push(action.point);
      isSorted = false;
      break;
    }
    case "closed": {
      newListPoints.forEach((point) => {
        if (point.id === action.pointId) {
          if (!point.end) {
            point.end = action.end;
            point.scoringTeam = action.scoringTeam;
          }
        }
      });
      break;
    }
    case "deleted": {
      newListPoints.forEach((point, index, list) => {
        if (point.id === action.pointId) {
          list.splice(index, 1);
        }
      });
      break;
    }
  }
  return isSorted
    ? newListPoints
    : newListPoints.sort((a, b) => a.start - b.start);
}
