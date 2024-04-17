import { Sparkline } from "@mantine/charts";
import { Flex } from "@mantine/core";
import { useMemo } from "react";

import { Flag } from "../../../components/Flag";
import { ColumnDef, Table } from "../../../components/Table";
import { TrendValue } from "../../../components/TrendValue";
import { PlayMusicButton } from "../../playMusicButton/PlayMusic";
import { ISoundData } from "../store";
import { GrowthCell } from "./GrowthCell";
import { SoundCell } from "./SoundCell";
import { SoundType } from "./SoundType";

export const RisingTable = ({ tableData }: { tableData: ISoundData[] }) => {
  const columns = useMemo<ColumnDef<ISoundData>[]>(
    () => [
      {
        field: "id",
        title: "Sound",
        render: (data) => <SoundCell data={data} />,
      },
      {
        field: "playUrl",
        title: "Play",
        render: (data) =>
          data.playUrl ? <PlayMusicButton audioLink={data.playUrl} id={data.musicId} /> : "-",
      },
      {
        field: "musicOriginal",
        title: "Type",
        render: (data) => <SoundType type={data.musicOriginal ? "original" : "official"} />,
      },
      {
        field: "growth",
        title: "Status",
        render: (data) => (
          <Flex>
            <GrowthCell value={data.growth} />
          </Flex>
        ),
      },
      {
        field: "lastWeekViewStats",
        title: "Trend",
        render: (data) => {
          if (!data.lastWeekViewStats || (data.lastWeekViewStats?.length || 0) < 2) return "-";

          return (
            <Sparkline
              w={60}
              h={36}
              p={0}
              data={data.lastWeekViewStats}
              curveType="linear"
              color={
                data.lastWeekViewStats.at(-1)! > data.lastWeekViewStats.at(0)!
                  ? "#00E082"
                  : "#FF355A"
              }
              fillOpacity={0.6}
              strokeWidth={2}
            />
          );
        },
      },
      {
        field: "reposts",
        title: "Videos",
        align: "right",
        render: (data) => <TrendValue current={data.reposts} growth={data.dailyRise} />,
      },
      {
        field: "topAudience",
        title: "Top Audience",
        align: "center",
        render: (data) => {
          if (!data.topAudienceLocation) return "-";

          return <Flag code={data.topAudienceLocation} />;
        },
      },
    ],
    [],
  );

  return <Table data={tableData} columns={columns} />;
};
