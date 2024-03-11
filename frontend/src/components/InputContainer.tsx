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

export const InputContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <form style={inputContainer}>{children}</form>;
};
