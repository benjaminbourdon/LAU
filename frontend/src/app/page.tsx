"use client";

import { InputContainer } from "@/components/InputContainer";
import { MyPlayer } from "../../remotion/MyPlayer";
import { Input } from "@/components/Input";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState<string>("Titre match");

  return (
    <>
      <h1>Lecteur augmenté</h1>
      <MyPlayer titleText={text} />
      <InputContainer>
        <Input text={text} setText={setText}></Input>
      </InputContainer>
    </>
  );
}
