import React, { useCallback } from "react";
import { z } from "zod";

const textarea: React.CSSProperties = {
  resize: "none",
  lineHeight: 1.7,
  display: "block",
  width: "100%",
  borderRadius: "var(--geist-border-radius)",
  backgroundColor: "var(--background)",
  padding: "var(--geist-half-pad)",
  color: "var(--foreground)",
  fontSize: 14,
};

const TextInputSchema = z.string().min(1).trim();

export type TextInputType = z.infer<typeof TextInputSchema>;

export default function Input({
  text,
  setText,
}: {
  text: TextInputType;
  setText: React.Dispatch<React.SetStateAction<TextInputType>>;
}) {
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setText(e.currentTarget.value);
    },
    [setText],
  );

  return (
    <input name="title" style={textarea} value={text} onChange={onChange} />
  );
}
