"use client";

import { InputContainer } from "@/components/InputContainer";
import { MyPlayer } from "../../remotion/MyPlayer";
import { Input } from "@/components/Input";

import { useState } from "react";

export default function InterractivePlayer() {
  const [text, setText] = useState<string>("Titre match");

  return (
    <>
      <MyPlayer titleText={text} />
      <InputContainer>
        <Input text={text} setText={setText}></Input>
      </InputContainer>
    </>
  );
}
