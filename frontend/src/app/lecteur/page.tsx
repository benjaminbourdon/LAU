import InterractivePlayer from "@/components/InterractivePlayer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAU",
  description: "",
};

export default function Home() {
  return (
    <>
      <h1>Lecteur augmenté</h1>
      <InterractivePlayer />
    </>
  );
}
