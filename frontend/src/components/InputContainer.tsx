import React from "react";

const inputContainer: React.CSSProperties = {
  border: "1px solid var(--unfocused-border-color)",
  padding: "var(--geist-pad)",
  borderRadius: "var(--geist-border-radius)",
  backgroundColor: "var(--background)",
  display: "flex",
  flexDirection: "column",
  width: "60%",
};

export default function InputContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <form style={inputContainer}>{children}</form>;
}
