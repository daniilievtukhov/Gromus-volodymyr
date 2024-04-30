import {
  Input,
  Button,
  Flex,
  Text,
  Group,
  Image,
  useCombobox,
  Combobox,
  TextInput,
  ComboboxOptionProps,
} from "@mantine/core";

import { Form, useForm } from "@mantine/form";

import { IconBrandInstagram, IconBrandTiktok, IconStarFilled } from "@tabler/icons-react";
import { chevronSvg, searchSvg } from "../../../assets";
import { SetStateAction, useEffect, useState } from "react";
import { Links } from "../../../core/links";
import { useTranscriptionHistory } from "../hooks/useTranscriptionHistory";
import { mainLanguages } from "../mainLanguages";
import { ApiTranscriptionGenerate } from "../../../requests/transcriptionGenerate";
import { notify } from "../../../features/notification";
import { useScriptVideoStore } from "../../videoToScript/store/videoToScript";
import { useNavigate } from "react-router-dom";

export const LinkInsertion = () => {
  const [selectedItem, setSelectedItem] = useState<string>("en");
  const [label, setSelectedLabel] = useState<string>("English");
  const navigate = useNavigate();
  const form = useForm<IForm>({
    initialValues: {
      url: "",
      lang: selectedItem,
    },
  });

  const [btnLoading, setBtnLoading] = useState(false);

  const {
    query: { data, isSuccess, isLoading },
  } = useTranscriptionHistory();

  useEffect(() => {
    console.log(data);
    if (data && data.lang) {
      console.log(data);
      console.log(data.lang);
    }
  }, [data]);

  const languages = [
    mainLanguages,
    {
      group: " ",
      items:
        data && data.lang
          ? Object.entries(data.lang).map((item) => {
              return { value: item[0], label: item[1], flagPath: "" };
            })
          : [],
    },
  ];

  const [search, setSearch] = useState("");
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

  const options = languages.map((group) => (
    <Combobox.Group label={group.group}>
      {group.items
        .filter((item) => item?.label.toLowerCase().includes(search.toLowerCase().trim()))
        .map((el) => (
          <Combobox.Option value={el.value} key={el.value}>
            <Group gap="sm" style={{ "&:hover": { background: "#D1FD0A" } }}>
              <IconStarFilled size={12} />
              {el.flagPath && (
                <Image w={15} h={15} src={`${Links.proDomain}${el.flagPath}`} radius="100%" />
              )}

              {el.label}
            </Group>
          </Combobox.Option>
        ))}
    </Combobox.Group>
  ));

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        console.log(values);
        setBtnLoading(true);

        await ApiTranscriptionGenerate.post({
          Language: values.lang,
          Url: values.url,
          EventType: "download_generate",
        }).then((res) => {
          useScriptVideoStore.setState(res.data);
          console.log(res);
          navigate("/video-to-script");
        });
      })}
    >
      <Flex gap={10}>
        <Combobox
          store={combobox}
          width={250}
          position="bottom-start"
          withArrow
          onOptionSubmit={(_, optionProps: ComboboxOptionProps) => {
            const { value, children } = optionProps;

            form.setFieldValue("lang", value);
            setSelectedItem(value);

            if (
              children &&
              children.props &&
              children.props.children &&
              children.props.children[2]
            ) {
              setSelectedLabel(children.props.children[2]); // Accessing children properties
            }
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
                  Translate to: <span style={{ color: "white" }}>{label}</span>
                </Text>
              }
              rightSection={
                <Image
                  src={chevronSvg}
                  onClick={() => combobox.openDropdown()}
                  style={{ cursor: "pointer" }}
                />
              }
              {...form.getInputProps("lang")}
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
                setSearch(event.currentTarget.value);
              }}
              placeholder="Search..."
              leftSection={<Image src={searchSvg} />}
            />
            <Combobox.Options mah={250} style={{ overflowY: "auto" }}>
              {options.length > 0 ? options : <Combobox.Empty>Nothing found</Combobox.Empty>}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>

        <TextInput
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
          leftSectionWidth={90}
          leftSection={
            <Group
              gap="5px"
              p={"4.6px 14px 4.6px 6px"}
              m={"0px 10px 0px 0px"}
              style={{ borderRight: "1.5px solid #3C3C3C", position: "absolute", top: 0 }}
            >
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
              type="submit"
              loading={btnLoading}
            >
              Get Script
            </Button>
          }
          style={{ width: 665, height: 40 }}
          {...form.getInputProps("url", { type: "input" })}
        />
      </Flex>
    </form>
  );
};

interface IForm {
  url: string;
  lang: string;
}
