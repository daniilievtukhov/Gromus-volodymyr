import { ScrollArea, Table as TableComponent } from "@mantine/core";
import { get } from "lodash-es";
import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export type ColumnDef<T extends Record<"id", string | number | null>> = {
  field: string;
  title: ReactNode;
  align?: React.CSSProperties["textAlign"];
  render?: (data: T) => ReactNode;
};

interface IProps<T extends Record<"id", string | number | null>> {
  columns: ColumnDef<T>[];
  data: T[];
}

export const Table = <T extends Record<"id", string | number | null>>({
  columns,
  data,
}: IProps<T>) => {
  const navigate = useNavigate();
  return (
    <ScrollArea scrollbars="x" mx={-32} offsetScrollbars pb={12}>
      <StyledTable>
        <TableComponent.Thead>
          <TableComponent.Tr>
            {columns.map((el) => (
              <TableComponent.Th key={el.field} ta={el.align}>
                {el.title}
              </TableComponent.Th>
            ))}
          </TableComponent.Tr>
        </TableComponent.Thead>
        <TableComponent.Tbody>
          {data.map((el) => {
            return (
              <TableComponent.Tr
                key={el.id}
                onClick={(e) => {

                  if (typeof el.id === "string" && el.id.match(/[a-zA-Z]/) && !((e.target as Element).closest("svg") || (e.target as Element).closest("a"))) {
                    navigate(`/video-to-script/${el.id}`);
                  }
                }}
              >
                {columns.map((col) => (
                  <TableComponent.Th key={col.field} ta={col.align}>
                    {col.render ? col.render(el) : get(el, col.field)}
                  </TableComponent.Th>
                ))}
              </TableComponent.Tr>
            );
          })}
        </TableComponent.Tbody>
      </StyledTable>
    </ScrollArea>
  );
};

const StyledTable: typeof TableComponent = styled(TableComponent)`
  tr {
    position: relative;
    border: none;

    td:first-child,
    th:first-child {
      padding-left: 32px;
    }
    td:last-child,
    th:last-child {
      padding-right: 32px;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: -1px;
      left: 32px;
      right: 32px;
      border-bottom: 0.8px solid var(--mantine-color-dark-8);
    }
  }

  tbody tr:hover {
    background-color: var(--mantine-color-dark-8);

    &::after {
      border: none;
    }
  }
`;
