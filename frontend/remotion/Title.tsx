import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

const title: React.CSSProperties = {
  fontFamily: "Helvetica, Arial, sans-serif",
  fontWeight: "bold",
  fontSize: 100,
  textAlign: "center",
  position: "absolute",
  bottom: 160,
  width: "100%",
};

const word: React.CSSProperties = {
  marginLeft: 10,
  marginRight: 10,
  display: "inline-block",
};

export const titleSchema = z.object({
  titleText: z.string(),
  titleColor: z.string(),
});

export default function Title({
  titleText,
  titleColor,
}: z.infer<typeof titleSchema>) {
  const videoConfig = useVideoConfig();
  const frame = useCurrentFrame();

  const words = titleText.split(" ");

  return (
    <h1 style={title}>
      {words.map((t, i) => {
        const delay = i * 5;

        const scale = spring({
          fps: videoConfig.fps,
          frame: frame - delay,
          config: {
            damping: 200,
          },
        });

        return (
          <span
            key={t + i.toString()}
            style={{
              ...word,
              color: titleColor,
              transform: `scale(${scale})`,
            }}
          >
            {t}
          </span>
        );
      })}
    </h1>
  );
}
