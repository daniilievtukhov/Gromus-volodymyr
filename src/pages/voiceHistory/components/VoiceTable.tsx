import { Flex, Text } from "@mantine/core";
import { useMemo } from "react";

import { ColumnDef, Table } from "../../../components/Table";

import RecordLink from "./RecordLink";

import InspectButton from "../../linksHistory/components/InspectButton";

interface ILinkData {
  id: number | string;
  social: {
    path: string;
    title: string;
  };
  date: string;
  video: string;
  inspect: string;
}

export const VoiceTable = ({ tableData }: { tableData: ILinkData[] }) => {
  const columns = useMemo<ColumnDef<ILinkData>[]>(
    () => [
      {
        field: "id",
        title: "#",
      },
      {
        field: "type",
        title: "Type & Title of record",
        render: (data) => (
          <RecordLink
            // image={data.social?.image}
            id={data.id}
            title={data.social.title}
            path={data.social.path}
          />
        ),
      },
      {
        field: "date",
        title: "Date",
        render: (data) => (
          <Text fw={"600"} fz={"md"}>
            {" "}
            {data.date}{" "}
          </Text>
        ),
      },

      {
        field: "inspect",
        title: "Inspect",
        render: (data) => <InspectButton path={data.inspect} />,
      },
    ],
    [],
  );

  return <Table data={tableData} columns={columns} />;
};
