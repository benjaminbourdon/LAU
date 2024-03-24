import InterractivePlayer from "@/components/InterractivePlayer";
import type { Metadata } from "next";
import { api, schemas } from "../../../client";
import { z } from "zod";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "LAU",
  description: "",
};

const defaultVideoData: z.infer<typeof schemas.VideoOut> = {
  src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  title: "Titre par défault",
};

async function getVideoData(videoId: string) {
  try {
    const videoData = await api.ReadVideoGet({
      params: {
        perma_token: videoId,
      },
    });
    return videoData;
  } catch (error) {
    redirect("/lecteur");
  }
}

export default async function Page({
  params,
}: {
  params: { videoId?: string[] };
}) {
  const initialVideoData = params.videoId
    ? await getVideoData(params.videoId[0])
    : defaultVideoData;
  return (
    <>
      <h1>Lecteur augmenté</h1>
      <InterractivePlayer initialData={initialVideoData} />
    </>
  );
}
