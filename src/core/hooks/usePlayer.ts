import { useMutation } from "@tanstack/react-query";
import { mapValues } from "lodash-es";
import { useEffect, useState } from "react";

import { useGlobalStore } from "../../globalStore";
import { ApiStatistics } from "../../requests/statistics";

interface IProps {
  id: string;
  url: string;
}

export const usePlayer = ({ id, url }: IProps) => {
  const audios = useGlobalStore((state) => state.audios);
  const current = useGlobalStore((state) => state.audios[id]);

  const [progress, setProgress] = useState(0);

  const play = () => {
    if (isIdle) return mutate();

    useGlobalStore.setState((prev) => ({
      audios: mapValues(prev.audios, (v, key) => {
        const isActive = key === id;

        v.element[isActive ? "play" : "pause"]();

        return { ...v, isActive };
      }),
    }));
  };

  const pause = () => {
    if (!current) return;

    useGlobalStore.setState((prev) => ({
      audios: mapValues(prev.audios, (v, key) => {
        if (key !== id) return v;

        v.element.pause();

        return { ...v, isActive: false };
      }),
    }));
  };
  const toggle = () => (current?.isActive ? pause() : play());
  const add = (element: HTMLAudioElement) => {
    useGlobalStore.setState({ audios: { ...audios, [id]: { element, isActive: true } } });
    element.play();
    play();
  };

  const { isPending, isError, isIdle, mutate } = useMutation({
    mutationKey: ["audio", id],
    mutationFn: () => ApiStatistics.playUrlValidator({ musicId: id, url }),
    onSuccess: ({ data }) => {
      const audio = new Audio(data);
      add(audio);
    },
  });

  useEffect(() => {
    if (!current) return;

    current.element.addEventListener("timeupdate", () => {
      setProgress(((current.element.currentTime ?? 0) / (current.element.duration ?? 0)) * 100);
    });
    current.element.addEventListener("ended", () => {
      useGlobalStore.setState((prev) => ({
        audios: mapValues(prev.audios, (v, key) => {
          if (key !== id) return v;

          return { ...v, isActive: false };
        }),
      }));
      setProgress(0);
    });
  }, [current, id]);

  return {
    isActive: current?.isActive,
    isPending,
    isError,
    progress,
    play,
    pause,
    toggle,
  };
};
