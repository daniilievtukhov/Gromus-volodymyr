import { Sparkline, Button } from "@mantine/charts";
import { Flex } from "@mantine/core";
import { useMemo } from "react";

import { Flag } from "../../../components/Flag";
import { ColumnDef, Table } from "../../../components/Table";
import { TrendValue } from "../../../components/TrendValue";
import { PlayMusicButton } from "../../playMusicButton/PlayMusic";
import { ISoundData } from "../../../features/risingSounds/store";
import { GrowthCell } from "./GrowthCell";
import { SoundCell } from "./SoundCell";
import { SoundType } from "./SoundType";

export const LinksTable = ({ tableData }: { tableData: ISoundData[] }) => {
  const columns = useMemo<ColumnDef<ISoundData>[]>(
    () => [
      {
        field: "id",
        title: "#",
        // render: (data) => <SoundCell data={data} />,
      },
      {
        field: "playUrl",
        title: "Social network & Title",
        // render: (data) =>
        //   data.playUrl ? <PlayMusicButton audioLink={data.playUrl} id={data.musicId} /> : "-",
      },
      {
        field: "musicOriginal",
        title: "Date",
        // render: (data) => <SoundType type={data.musicOriginal ? "original" : "official"} />,
      },
      {
        field: "growth",
        title: "Open video",
        // render: (data) => (
        //   <Flex>
        //     <Button>Hi</Button>
        //   </Flex>
        // ),
      },
      {
        field: "lastWeekViewStats",
        title: "Inspect",
        // render: (data) => {
        //   if (!data.lastWeekViewStats || (data.lastWeekViewStats?.length || 0) < 2) return "-";

        //   return (
        //     <Sparkline
        //       w={60}
        //       h={36}
        //       p={0}
        //       data={data.lastWeekViewStats}
        //       curveType="linear"
        //       color={
        //         data.lastWeekViewStats.at(-1)! > data.lastWeekViewStats.at(0)!
        //           ? "#00E082"
        //           : "#FF355A"
        //       }
        //       fillOpacity={0.6}
        //       strokeWidth={2}
        //     />
        //   );
        // },
      },
    ],
    [],
  );

  return <Table data={tableData} columns={columns} />;
};
