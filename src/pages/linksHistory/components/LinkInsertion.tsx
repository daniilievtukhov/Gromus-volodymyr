import {
  Input,
  Button,
  Select,
  Flex,
  Text,
  Stack,
  Box,
  Overlay,
  Group,
  Image,
  useCombobox,
  Combobox,
  TextInput,
} from "@mantine/core";

import {
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandTiktok,
  IconStarFilled,
  IconStarOff,
} from "@tabler/icons-react";
import { chevronSvg, searchSvg } from "../../../assets";
import { useEffect, useState } from "react";
import { Links } from "../../../core/links";

const languages = [
  {
    group: "",
    items: [
      {
        label: "English",
        value: "English",
        countryCode: "EN",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/gb.svg",
      },
      {
        label: "Spain",
        value: "Spain",
        countryCode: "ES",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/es.svg",
      },
      {
        label: "Germany",
        value: "Germany",
        countryCode: "DE",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/de.svg",
      },
      {
        label: "Ukrainian",
        value: "Ukrainian",
        countryCode: "UK",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ua.svg",
      },
      {
        label: "Russian",
        value: "Russian",
        countryCode: "RU",
        flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ru.svg",
      },
    ],
  },
  { group: " ", items: [] },
];

const TurboSearchSelect = () => {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<string>("English");
  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  useEffect(() => {}, [selectedItem]);

  const options = languages.map((group) => (
    <Combobox.Group label={group.group}>
      {group.items
        .filter((item) => item.label.toLowerCase().includes(search.toLowerCase().trim()))
        .map((el) => (
          <Combobox.Option value={el.value} key={el.value}>
            <Group gap="sm" style={{ "&:hover": { background: "#D1FD0A" } }}>
              <IconStarFilled size={12} />
              <Image w={15} h={15} src={`${Links.proDomain}${el.flagPath}`} radius="100%" />
              {el.label}
            </Group>
          </Combobox.Option>
        ))}
    </Combobox.Group>
  ));

  return (
    <>
      <Combobox
        store={combobox}
        width={250}
        position="bottom-start"
        withArrow
        onOptionSubmit={(val) => {
          console.log(val);
          setSelectedItem(val);
          combobox.closeDropdown();
        }}
        middlewares={{ flip: true, shift: false }}
        offset={{ mainAxis: 10, crossAxis: 210 }}
      >
        <Combobox.Target withAriaAttributes={false}>
          <Input
            styles={{
              wrapper: {
                background: "none",
              },
              input: {
                background: "none",
              },
            }}
            component="div"
            style={{ marginBottom: 4 }}
            radius="lg"
            pointer
            content={selectedItem || ""}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            leftSectionWidth={200}
            leftSection={
              <Text size="sm" style={{ cursor: "pointer" }}>
                Translate to: <span style={{ color: "white" }}>{selectedItem}</span>
              </Text>
            }
            rightSection={
              <Image
                src={chevronSvg}
                onClick={() => combobox.openDropdown()}
                style={{ cursor: "pointer" }}
              />
            }
            required
          />
        </Combobox.Target>

        <Combobox.Dropdown
          style={{
            border: "none",
          }}
        >
          <Combobox.Search
            value={search}
            styles={{
              wrapper: {
                background: "none",
              },
              input: {
                position: "relative",
                zIndex: 100,
                background: "none",
              },
            }}
            onChange={(event) => {
              console.log(event);
              setSearch(event.currentTarget.value);
            }}
            placeholder="Search..."
            leftSection={<Image src={searchSvg} />}
          />
          <Combobox.Options>
            {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </>
  );
};

export const LinkInsertion = () => {
  return (
    <Flex gap={10}>
      <TurboSearchSelect />

      <Input
        radius="lg"
        component="input"
        styles={{
          wrapper: {
            padding: "0px",
            margin: "0px",
            top: 0,
            background: "none",
          },

          input: {
            background: "none",
          },

          section: {
            margin: "0px 5px",
            padding: "0px 5px",
            background: "none",
          },
        }}
        p={"0px"}
        wrapperProps={{ padding: "0px" }}
        placeholder={"Enter the link here..."}
        leftSectionWidth={110}
        leftSection={
          <Group
            gap="5px"
            p={"4.6px 14px 4.6px 6px"}
            m={"0px 10px 0px 0px"}
            style={{ borderRight: "1.5px solid #3C3C3C", position: "absolute", top: 0 }}
          >
            {/* <IconBrandYoutube color="white" size={14} />
            / */}
            <IconBrandInstagram color="white" size={14} />
            /
            <IconBrandTiktok color="white" size={14} />
          </Group>
        }
        rightSection={
          <Button
            color="rgba(209, 253, 10, 1)"
            component="button"
            style={{ color: "black", position: "absolute", top: -1, cursor: "pointer" }}
          >
            Get Script
          </Button>
        }
        style={{ width: 665, height: 40 }}
      />
    </Flex>
  );
};
