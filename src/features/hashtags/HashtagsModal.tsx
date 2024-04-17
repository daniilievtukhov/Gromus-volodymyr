import { Box, Flex, Text, Paper, Image, Button } from "@mantine/core";
import Modal from "@mui/material/Modal";
import { AccentTitle } from "../../components/AccentTitle";
import { hashtagSvg } from "../../assets";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";

export const HashtagsModal = () => {
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
    <>
      <Box style={{ margin: 0 }}>
        <Wrapper>
          <Flex justify="space-between" align="center">
            <AccentTitle icon={<Image w={24} src={hashtagSvg} />}>
              These sets are generated on the base of relevancy to your account
            </AccentTitle>
            <IconX />
          </Flex>
          <Box mt={20}>
            {modal.map((el) => {
              return (
                <>
                  <Paper
                    style={{
                      height: 46,
                      backgroundColor: el.color,
                      background: `linear-gradient(to right, ${el.color}  ${el.persent}, #171719 0%)`,
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
                </>
              );
            })}
          </Box>
        </Wrapper>
      </Box>
    </>
  );
};

const Wrapper = styled.div`
  min-width: 280px;
  background-color: #212122;
  padding: 20px;
  padding-bottom: 10px;
`;
