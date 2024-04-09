import InterractivePlayer from "@/components/InterractivePlayer";
import type { Metadata } from "next";
import { VideoService } from "../../../client";
import { redirect } from "next/navigation";
import { MetadataProvider } from "@/components/MetadataContext";

export const metadata: Metadata = {
  title: "LAU",
  description: "",
};

async function getVideoData(videoId: string) {
  try {
    const videoData = await VideoService.readVideoGet({
      permaToken: videoId,
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
    : undefined;

  return (
    <>
      <h1 className="text-3xl">Lecteur augmenté</h1>
      <MetadataProvider initialValue={initialVideoData}>
        <InterractivePlayer />
      </MetadataProvider>
    </>
  );
}
