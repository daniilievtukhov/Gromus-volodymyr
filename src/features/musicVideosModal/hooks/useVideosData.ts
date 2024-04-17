import { useQuery } from "@tanstack/react-query";

import { useGlobalStore } from "../../../globalStore";
import { ApiSoundVideos } from "../../../requests/soundVideos";

export const useVideosData = () => {
  const { musicId, opened } = useGlobalStore((s) => s.musicVideosModal);

  return useQuery({
    queryKey: ["soundVideos", musicId],
    queryFn: () => ApiSoundVideos.get(musicId),
    enabled: opened,
  });
};
