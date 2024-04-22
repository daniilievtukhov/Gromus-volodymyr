import { Input, Button, Select, Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
export const LinkInsertion = () => {
  return (
    <Flex gap={10}>
      <Select
        radius="lg"
        variant="filled"
        placeholder="Translate to"
        data={["React", "Angular", "Vue", "Svelte"]}
        style={{ width: 193, height: 40 }}
      />
      <Input
        radius="lg"
        placeholder="Enter the link here..."
        leftSection={
          <>
            <IconX />
            <Text>/</Text>
          </>
        }
        style={{ width: 665, height: 40 }}
      />
      <Button
        color="rgba(209, 253, 10, 1)"
        variant="filled"
        hoverVariant="filled"
        style={{ width: 103, height: 40, color: "black" }}
      >
        Get Script
      </Button>
    </Flex>
  );
};
