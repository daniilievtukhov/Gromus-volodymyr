import { Box, Flex, Text, Paper, Image } from "@mantine/core";
import { AccentTitle } from "../../components/AccentTitle";
import { hashtagSvg } from "../../assets";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";

export const HashtagsModal: React.FC<{ onClose: (event: React.MouseEvent) => void }> = ({
  onClose,
}) => {
  const modal = [
    {
      letter: "a",
      color: "#00BE6E",
      persent: "100%",
    },
    {
      letter: "b",
      color: "#00B3BE",
      persent: "60%",
    },
    {
      letter: "c",
      color: "#004CBE",
      persent: "40%",
    },
    {
      letter: "d",
      color: "#5F00BE",
      persent: "20%",
    },
  ];

  return (
    <ModalOverlay>
      <ModalContent>
        <IconXWrapper>
          <IconX onClick={onClose} />
        </IconXWrapper>
        <Flex justify="space-between" align="center">
          <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
            These sets are generated on the base of relevancy to your account
          </AccentTitle>
        </Flex>
        <Box mt={20}>
          {modal.map((el) => (
            <Paper
              style={{
                height: 46,
                maxWidth: 390,
                maxHeight: 370,
                backgroundColor: el.color,
                background: `linear-gradient(to right, ${el.color} ${el.persent}, #171719 0%)`,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                borderRadius: 0,
              }}
            >
              <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end">
                {`Relevant ${el.letter}`}
              </Text>
              <Text fz={16} fw={600} c={"#fff"} lh={1.25} truncate="end">
                {`${el.persent}`}
              </Text>
            </Paper>
          ))}
        </Box>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #212122;
  padding: 20px;
  width: 390px;
  height: 370px;
`;

const IconXWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;
