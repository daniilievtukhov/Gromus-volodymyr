import { Button, Group, TextInput } from "@mantine/core";
import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";

const LinkInput = () => {
  return (
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
      p="0px"
      wrapperProps={{ padding: "0px" }}
      placeholder="Enter the link here..."
      leftSectionWidth={90}
      leftSection={
        <Group
          gap="5px"
          p="4.6px 14px 4.6px 6px"
          m="0px 10px 0px 0px"
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
        >
          Get Script
        </Button>
      }
      style={{ width: 665, height: 40 }}
      name="url"
    />
  );
};

export default LinkInput;