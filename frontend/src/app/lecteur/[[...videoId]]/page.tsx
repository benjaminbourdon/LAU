import InterractivePlayer from "@/components/InterractivePlayer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LAU",
  description: "",
};

export default function Page({ params }: { params: { videoId?: string[] } }) {
  return (
    <>
      <h1>Lecteur augmenté</h1>
      <InterractivePlayer />
    </>
  );
}
