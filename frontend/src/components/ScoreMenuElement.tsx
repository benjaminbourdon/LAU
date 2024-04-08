import { Point } from "./ScoreMenu";
import { Button } from "@nextui-org/button";
import { PressEvent } from "@react-types/shared";

export default function ScoreMenuElement({
  point,
  isActive,
  onDelete,
  goTo,
}: {
  point: Point;
  isActive: boolean;
  onDelete: (e: PressEvent) => void;
  goTo: (e: PressEvent) => void;
}) {
  const style = isActive ? "bg-primary-100" : "bg-default-100";

  return (
    <li className={style + " flex flex-row gap-4 p-2"}>
      <p className="grow flex flex-row">
        <span className="w-1/6">{"Début : " + point.start + "\n"}</span>
        <span className="w-1/6">
          {point.end !== undefined ? "Fin : " + point.end + "\n" : null}
        </span>
        <span className="w-1/3">
          {point.end !== undefined && point.scoringTeam !== undefined
            ? "Point marqué par " + point.scoringTeam
            : "Point non fini"}
        </span>
      </p>
      <Button onPress={goTo} variant="flat" data-frame={point.start.toString()}>
        Y aller
      </Button>
      <Button
        onPress={onDelete}
        variant="ghost"
        color="danger"
        data-point-id={point.id.toString()}
      >
        Supprimer
      </Button>
    </li>
  );
}
