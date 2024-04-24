import { Flex, Text } from "@mantine/core";
import { useMemo } from "react";

import { ColumnDef, Table } from "../../../components/Table";

import SocialMediaLink from "./SocialMediaLink";
import OpenVideoButton from "./OpenVideo";
import InspectButton from "./InspectButton";

interface ILinkData {
  id: number | string,
  social: {
    path: string,
    title: string
  },
  date: string,
  video: string,
  inspect: string 
}

export const LinksTable = ({ tableData }: { tableData: ILinkData[] }) => {
  const columns = useMemo<ColumnDef<ILinkData>[]>(
    () => [
      {
        field: "id",
        title: "#",
      },
      {
        field: "social",
        title: "Social network & Title",
          render: (data) =>
                        <SocialMediaLink 
                          // image={data.social?.image} 
                          id={data.id} 
                          title={data.social.title} 
                          path={data.social.path} 
                        /> 
                  
      },
      {
        field: "date",
        title: "Date",
        render: 
          (data) => <Text fw={"600"} fz={"md"}> {data.date} </Text>,
      },
      {
        field: "video",
        title: "Open video",
          render: (data) => <OpenVideoButton path={data.video} />
      },
      {
        field: "inspect",
        title: "Inspect",
        render: (data) => <InspectButton path={data.inspect} />
      },
    ],
    [],
  );

  return <Table data={tableData} columns={columns} />;
};
