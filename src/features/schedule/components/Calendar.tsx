import { darken, Group, Image, ScrollArea, Select, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { format, setHours } from "date-fns";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import styled, { css } from "styled-components";

import { Links } from "../../../core/links";
import { ApiSchedule } from "../../../requests/schedule";
import { usePostsStore } from "../../chat/store";
import { useEffect } from "react";

export const Calendar = () => {
  const store = usePostsStore();

  const [posts, setPosts] = useState<{
    categoryId: number;
    country: string;
    daysStats: {
      dayOfWeek: number;
      dayName: string;
      hoursStats: {
        hour: number;
        percent: number;
      }[];
    }[];
    followers: number;
  }>({
    categoryId: 0,
    country: "",
    daysStats: [],
    followers: 0,
  });

  useEffect(() => {
    setPosts(store);
    setCountry(store.country);
  }, [store]);

  const [country, setCountry] = useState<string | null>(null);

  const { data: filters } = useQuery({
    queryKey: ["scheduleFilters"],
    queryFn: async () => {
      const res = await ApiSchedule.getFilters();

      const options = res.data.countriesList.map((el) => ({
        value: el.countryCode,
        label: el.countryName,
        flagPath: el.flagPath,
      })).sort((a, b) => a.label.localeCompare(b.label));

      const icons = options.reduce<Record<string, string>>(
        (acc, el) => ({ ...acc, [el.value]: el.flagPath }),
        {},
      );

      setCountry(res.data.country);

      return { options, icons, category: res.data.category, followers: res.data.followers };
    },
  });

  const schedule = useQuery({
    queryKey: ["schedule", country, posts, filters?.category, filters?.followers],
    queryFn: async () => {
      if (!country) return null;

      let res;
      let stats;
      if (!posts.daysStats.length) {
        res = await ApiSchedule.get({
          country,
          category: filters?.category,
          followers: filters?.followers,
        });

        stats = res.data.daysStats;
      } else {
        res = posts;
        stats = res.daysStats;
      }

      const getStats = (day: number): IScheduleData[] => {
        const array: (ApiSchedule.HoursStat | null)[] = Array(6).fill(null);
        const current = stats.find((el) => el.dayOfWeek === day);
        if (!current) return [];

        current.hoursStats.forEach((el: ApiSchedule.HoursStat) => {
          const currentIdx = ~~((el.hour - 1) / 4);

          const currentEl = array[currentIdx];
          if (!currentEl || el.percent > currentEl.percent) array[currentIdx] = el;
        });

        return array.map((el) =>
          el
            ? {
                time: format(setHours(new Date(0), el.hour), "h aaa"),
                percent: el.percent,
              }
            : null,
        );
      };

      const result: ISchedule[] = [
        { day: "Mon", data: getStats(1) },
        { day: "Tue", data: getStats(2) },
        { day: "Wed", data: getStats(3) },
        { day: "Thu", data: getStats(4) },
        { day: "Fri", data: getStats(5) },
        { day: "Sat", color: "blue", data: getStats(6) },
        { day: "Sun", color: "red", data: getStats(0) },
      ];

      return result;
    },
  });

  return (
    <ScrollArea type="auto" mx={-40} offsetScrollbars>
      <Stack gap={16} px={40}>
        <Select
          value={country}
          onChange={setCountry}
          allowDeselect={false}
          data={filters?.options}
          searchable
          renderOption={(el) => {
            return (
              <Group>
                <Image w={24} src={`${Links.proDomain}${filters?.icons?.[el.option.value]}`} />
                <Text c={country===el.option.value ? "white" : ""}>{el.option.label}</Text>
              </Group>
            );
          }}
        />
        {schedule.isLoading && (
          <Stack gap={4}>
            <Skeleton h={48} />
            <Skeleton h={48} />
            <Skeleton h={48} />
            <Skeleton h={48} />
            <Skeleton h={48} />
            <Skeleton h={48} />
            <Skeleton h={48} />
          </Stack>
        )}

        <Wrapper>
          {schedule.data?.map((el) => (
            <Fragment key={el.day}>
              <Cell $color={el.color}>{el.day}</Cell>
              {el.data
                .concat(Array(6).fill(null))
                .slice(0, 6)
                .map((el, idx) => (
                  <Cell
                    key={idx}
                    $fw={700}
                    $hover={!!el?.time}
                    style={
                      el?.percent
                        ? {
                            backgroundColor: darken("#D1FD0A", (1 - 0.01 * el.percent) / 2),
                            color: el.percent > 50 ? "black" : "white",
                          }
                        : {}
                    }
                  >
                    {el?.time}
                  </Cell>
                ))}
            </Fragment>
          ))}
        </Wrapper>
      </Stack>
    </ScrollArea>
  );
};

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: min-content repeat(6, 1fr);
  row-gap: 4px;
`;

const Cell = styled.div<{ $color?: IColor; $fw?: number; $hover?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  background-color: #212122;
  color: white;
  font-size: 14px;
  font-weight: ${({ $fw }) => $fw ?? 600};
  transition: 0.3s;
  white-space: nowrap;

  ${({ $color }) =>
    $color &&
    css`
      background-color: ${cssByColor[$color][0]};
      color: ${cssByColor[$color][1]};
    `}

  ${({ $hover }) =>
    $hover &&
    css`
      &:hover {
        scale: 1.05;
        z-index: 1;
      }
    `}
`;

type IColor = "blue" | "red" | "lime" | "olive";
type IScheduleData = { time?: string; percent?: number } | null;
interface ISchedule {
  day: string;
  color?: IColor;
  data: IScheduleData[];
}

const cssByColor: Record<IColor, [string, string]> = {
  blue: ["#2a2f32", "#7fcaff"],
  red: ["#403235", "#ff6d88"],
  lime: ["#d1fd0a", "#000000"],
  olive: ["#798f16", "#ffffff"],
};
