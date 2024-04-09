import { VideoService } from "@/client";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useDefinedContext } from "@/hooks/context";
import { MetadataContext, MetadataDispatchContext } from "./MetadataContext";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

export default function MetadataForm() {
  const metadata = useDefinedContext(MetadataContext);
  const metadataDispatch = useDefinedContext(MetadataDispatchContext);
  const { videoId } = useParams<{ videoId?: Array<string> }>();
  const router = useRouter();

  const onPressSaver = useCallback(async () => {
    if (videoId) {
      VideoService.replaceVideoPut({
        permaToken: videoId[0],
        requestBody: metadata,
      });
    } else {
      const res = await VideoService.createVideoPost({ requestBody: metadata });
      router.push("/lecteur/" + res.perma_token);
    }
  }, [videoId, metadata, router]);

  return (
    <form className="border-4 rounded p-2 m-2 grid gap-4">
      <Input
        label="Nom de l'évènement "
        value={metadata.event}
        onValueChange={(newValue) =>
          metadataDispatch({ target: "event", value: newValue })
        }
      />
      <Input
        type="url"
        label="URL de la vidéo"
        value={metadata.src}
        onValueChange={(newValue) =>
          metadataDispatch({ target: "src", value: newValue })
        }
        isRequired
      />
      <Input
        label={"Nom de l'équipe foncée "}
        value={metadata.teams.dark.name}
        onValueChange={(newValue) =>
          metadataDispatch({
            target: "teams",
            team: "dark",
            value: { ...metadata.teams.dark, name: newValue },
          })
        }
      />
      <Input
        label={"Nom de l'équipe claire "}
        value={metadata.teams.light.name}
        onValueChange={(newValue) =>
          metadataDispatch({
            target: "teams",
            team: "light",
            value: { ...metadata.teams.light, name: newValue },
          })
        }
      />
      <Button onPress={onPressSaver} color="primary">
        Enregistrer
      </Button>
    </form>
  );
}
