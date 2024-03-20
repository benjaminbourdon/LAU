"use client";

import React, { MouseEventHandler, useCallback } from "react";
import { z } from "zod";

const TextButtonSchema = z.string().min(1).trim();

export type TextButtonType = z.infer<typeof TextButtonSchema>;

export default function ActionButton({
  text,
  action,
}: {
  text: TextButtonType;
  action: MouseEventHandler;
}) {
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
}
