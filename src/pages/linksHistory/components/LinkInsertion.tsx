import { Input, Button, Select, Flex, Text, Stack, Box, Overlay, Group, Code, Image } from "@mantine/core";
import { IconBrandYoutube, IconBrandInstagram, IconBrandTiktok, IconStarFilled, IconStarOff } from "@tabler/icons-react";
import { ApiSchedule } from "../../../requests/schedule";
import { useEffect } from "react";
import { Links } from "../../../core/links";


const inputPlaceholder: React.CSSProperties = {
   width: 665,
   height: 40,
  "input": {
    padding: "0px 30px",
    color: "red"
  }
};

const languages = [
  {label: "English", value: "EN", flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/gb.svg"},
  {label: "Spain", value: "ES", flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/es.svg"},
  {label: "Germany", value: "DE", flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/de.svg"},
  {label: "Ukrainian", value: "UK", flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ua.svg"},
  {label: "Russian", value: "RU", flagPath: "/app-assets/fonts/flag-icon-css/flags/4x3/ru.svg"},
]

export const LinkInsertion = () => {
  const Icons = () => ( 
    <>
      <IconBrandYoutube color="white" size="14px" />
      /
      <IconBrandInstagram color="white" size="14px" />
      /
      <IconBrandTiktok color="white" size="14px" />
    </>
  );

  useEffect(() => {
    (async () => { 
      const res = await ApiSchedule.getFilters();

      console.log(res);
    })();
  });
  
  return (
    <Flex gap={10}>
      <Select
        radius="lg"
        placeholder="Translate to"
        searchable
        renderOption={(el) => {
          console.log(el);
          return (
            <Group key={el.option.code} gap="sm" style={{"&:hover": {background: "#D1FD0A"}}}>
              <IconStarFilled size={12}/>
              <Image w={15} h={15} src={`${Links.proDomain}${el.option.flagPath}`} radius="100%"/>
              {el.option.label}
            </Group>
            );
          }}
        comboboxProps={{ position: 'bottom-end', middlewares: { flip: false, shift: false }, offset: { mainAxis: 10, crossAxis: 120 } }}
        data={languages}
        withAsterisk
        style={{ width: 200, height: 40 }}
        required
      />
      
      <Input
        radius="lg"
        component="input"
        placeholder={"Enter the link here..."}

        leftSection={
          <Icons/>
        }
        style={inputPlaceholder}
      />

      <Button
        color="rgba(209, 253, 10, 1)"
        variant="filled"
        hoverVariant="filled"
        style={{ minWidth: 123, height: 40, color: "black" }}
      >
        Get Script
      </Button>
    </Flex>
  );
};
