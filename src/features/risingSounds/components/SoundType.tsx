import { Badge } from "@mantine/core";
import { ReactElement } from "react";

interface IProps {
  type?: ISoundType | null;
}

export const SoundType = ({ type }: IProps) => {
  if (!type) return "-";

  return badgeByType[type];
};

export type ISoundType = "original" | "official" | "repost";

const badgeByType: Record<ISoundType, ReactElement> = {
  original: (
    <Badge color="#27459140" c="#6993FF">
      original
    </Badge>
  ),
  official: (
    <Badge color="#22615240" c="#37D1AC">
      official
    </Badge>
  ),
  repost: (
    <Badge color="rgba(255, 255, 255, 0.15)" c="rgb(189 191 205)">
      repost
    </Badge>
  ),
};
