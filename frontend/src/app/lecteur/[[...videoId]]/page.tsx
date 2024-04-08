import InterractivePlayer from "@/components/InterractivePlayer";
import type { Metadata } from "next";
import { VideoService, VideoOut } from "../../../client";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "LAU",
  description: "",
};

const defaultVideoData: VideoOut = {
  src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  event: "Championnat",
  teams: {
    dark: {
      name: "Équipe sombre",
      color: "black",
    },
    light: {
      name: "Équipe claire",
      color: "white",
    },
  },
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
    : defaultVideoData;
  return (
    <>
      <h1 className="text-3xl">Lecteur augmenté</h1>
      <InterractivePlayer initialData={initialVideoData} />
    </>
  );
}
