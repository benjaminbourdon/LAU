"use client";
import React, { MouseEventHandler, useCallback } from "react";

export const ActionButton: React.FC<{
  text: string;
  action: MouseEventHandler;
}> = ({ text, action }) => {
  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      action(e);
    },
    [action],
  );

  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
};
