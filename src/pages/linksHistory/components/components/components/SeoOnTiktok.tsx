import { Box, Flex, Text, Paper, Group, Button } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { IconCopy, IconEdit, IconWorld, IconMessageChatbot } from "@tabler/icons-react";
import styled from "styled-components";

export const SeoOnTiktok = () => {
  return (
    <>
      <Box style={{ marginTop: 300, position: "relative" }}>
        <Paper
          style={{
            height: "60px",
            backgroundColor: " rgba(209, 253, 10, 1) ",
            borderRadius: 10,
            marginTop: "30px",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            style={{ padding: "0 20px", height: "100%" }}
          >
            <Flex align="center" style={{ height: "100%", alignItems: "flex-end" }}>
              <Text fz={16} fw={600} c={"#000000"} lh={1.25} truncate="end">
                <IconSparkles stroke={1.5} style={{ verticalAlign: "middle", cursor: "pointer" }} />
                SEO на TikTok: Як підкорити алгоритми
              </Text>
            </Flex>
          </Flex>

          <Wrapper>
            <Paper
              style={{
                minHeight: "50px",
                backgroundColor: " rgba(33, 33, 34, 1)",
                borderRadius: 10,
                marginTop: "20px",
              }}
            >
              <Group align="center">
                <Text
                  fz={16}
                  fw={600}
                  c={"#ffffff"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginLeft: 8, marginTop: "5px" }}
                >
                  Original:
                </Text>
                <Text
                  fz={16}
                  fw={400}
                  c={"#ffffff"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginTop: "5px" }}
                >
                  hashtags
                </Text>
              </Group>
              <Group align="center" gap={6}>
                <Text
                  fz={16}
                  fw={600}
                  c={"rgba(209, 253, 10, 1)"}
                  lh={1.25}
                  truncate="end"
                  style={{ marginLeft: 8 }}
                >
                  AI-Based:
                </Text>
                <Text fz={16} fw={400} c={"#ffffff"} lh={1.25} truncate="end">
                  hashtags for ai-based
                </Text>
              </Group>
            </Paper>
            <Text c={"#ffffff"} style={{ marginTop: "30px" }}>
              Чи знаєте ви, що TikTok зробив революцію в SEO? Нещодавно TikTok зробив крок, який
              змінив правила гри: він додав SEO. Тепер, щоб ваш контент був на вершині, потрібно
              знати кілька хитрощів. Перше - використовуйте лише трендові ключові слова. Знайдіть їх
              у трендових хештегах, Google Trends, SEMrush та інших сервісах. Друге - майстерність
              Captions. Ваші субтитри повинні містити трендові слова та ключові фрази, за якими ви
              хочете, щоб вас знаходили. І третє, але не менш важливе - вміння ховати ключові слова
              за різними елементами відео. TikTok тепер враховує все! Не забудьте використовувати ці
              поради, щоб ваш контент підкорив TikTok SEO. Поділіться своїми успіхами в коментарях!
            </Text>

            <Flex align="center" gap={10} style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Button
                size="lg"
                color="rgba(58, 58, 58, 1)"
                variant="filled"
                style={{ color: "white" }}
              >
                <IconCopy size={18} style={{ marginRight: 4 }} />
                Copy
              </Button>
              <Button size="lg" color="white" fz="md" variant="outline">
                <IconEdit style={{ marginRight: 4 }} />
                Edit
              </Button>
              <Button size="lg" color="white" fz="md" variant="outline">
                <IconSparkles style={{ marginRight: 4 }} />
                Rethink
              </Button>
              <Button size="lg" color="white" fz="md" variant="outline">
                <IconMessageChatbot style={{ marginRight: 4 }} />
                Regenerate hashtags
              </Button>
              <Button size="lg" color="white" fz="md" variant="outline">
                <IconWorld style={{ marginRight: 4 }} />
                Change Language
              </Button>
            </Flex>
          </Wrapper>
        </Paper>
      </Box>
    </>
  );
};
const Wrapper = styled.div`
  min-width: 280px;
  background-color: rgba(19, 19, 20, 1);
  padding: 20px;
  padding-bottom: 10px;
  border-radius: 50;
`;
