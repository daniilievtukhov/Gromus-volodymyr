import { useEffect } from "react";
import { Avatar, Button, Flex, Group, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { formatDistance } from "date-fns";
import styled from "styled-components";
import { FadeBlock } from "../../../components/FadeBlock";
import { useLayoutStore } from "../../../layoutStore";
import { IMessage } from "../store";
import AiLogo from "../../../assets/icons/ai_logo.svg";
import { Presets } from "../../presets";

const _Message = ({ message }: { message: IMessage }) => {
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  const { messageId } = message;
  console.log(messageId);
  console.log(message);
  const { presetButtons, HashtagButton, AccountButton, TimeButton } = Presets();
  useEffect(() => {
    if (message.buttons && message.buttons[0] && message.buttons[0].onClick) {
      message.buttons[0].onClick();
    }
  }, [message]);

  const ButtonPresets = () => {
    return (
      <>
        {message?.buttons && message.buttons.length > 1 && (
          <>
            <Text c="lime.4" fz={14}>
              Choose an option:
            </Text>
            <Group gap={6}>
              {message.buttons.map((btn) => (
                <StyledButton
                  key={btn.label}
                  variant="outline"
                  radius="xl"
                  color="lime.4"
                  onClick={() => {
                    btn.onClick && btn.onClick();

                    if (isMobile) {
                      useLayoutStore.setState({
                        chatOpened: false,
                      });
                    }
                  }}
                >
                  {btn.label}
                </StyledButton>
              ))}
            </Group>
          </>
        )}
      </>
    );
  };

  return (
    <FadeBlock>
      <Stack>
        <Flex align={"center"} gap={8} justify={"space-between"}>
          <Flex align={"center"} gap={8}>
            <Avatar radius="xl" size={40} bg="lime.4" color="#000">
              {message.isCopilot ? <img src={AiLogo} width={50} height={50} /> : null}
            </Avatar>
            <Text fz="sm" fw="700">
              {message.isCopilot ? " " : "You"}
            </Text>
          </Flex>
          <Text fz={12} c="#56595C">
            {formatDistance(new Date(message.date), new Date(), { addSuffix: true })}
          </Text>
        </Flex>
        <StyledText component={"div"}>
          {message.message}
          {false && (
            <div>
              <StyledText>
                Currently, I can offer you the following:
                <br />
                <u>Top sounds across any territory or check out global rising sounds </u>
              </StyledText>
              <Group mt="1rem" gap={6} justify="center">
                {presetButtons.map((btn) => (
                  <StyledButton
                    key={btn.label}
                    variant="outline"
                    radius="xl"
                    color="lime.4"
                    onClick={() => btn.onClick()}
                  >
                    {btn.label}
                  </StyledButton>
                ))}
              </Group>
              <br />
              <u>The best time to post sound </u>(if you have completed TikTok auth., you will
              receive personalized recommendations)
              <Group mt="1rem" gap={6} justify="center">
                <StyledButton
                  key={TimeButton.label}
                  onClick={() => TimeButton.onClick()}
                  variant="outline"
                  radius="xl"
                  color="lime.4"
                >
                  Analyze my account
                </StyledButton>
              </Group>
              <br />
              <u>Growing hashtags </u>(Personalized for your sounds and account)
              <br />
              <Group mt="1rem" gap={6} justify="center">
                <StyledButton
                  key={HashtagButton.label}
                  variant="outline"
                  radius="xl"
                  color="lime.4"
                  onClick={() => HashtagButton.onClick()}
                >
                  Hashtags for me
                </StyledButton>
              </Group>
              <br />
              <u>Analyze your account </u>
              <Group mt="1rem" gap={6} justify="center">
                <StyledButton
                  key={AccountButton.label}
                  onClick={() => AccountButton.onClick()}
                  variant="outline"
                  radius="xl"
                  color="lime.4"
                >
                  Analyze my account
                </StyledButton>
              </Group>
              <br />
              <u>Analyze any account </u>
              <br />
              Just write to me
              <br />
              <u>
                Analyze account @creatorname or Analyze account https://www.tiktok.com/@creatorname
              </u>
            </div>
          )}
        </StyledText>
        {/* <RateMessageForm />  */}
        <ButtonPresets />
      </Stack>
    </FadeBlock>
  );
};

export const StyledButton: typeof Button = styled(Button)`
  color: white;
  border-color: #6a6a6a;

  &:hover {
    color: white;
    border-color: #d1fd0a;
  }
`;

const StyledText: typeof Text = styled(Text).attrs({ fz: "sm", fw: "600", lh: "sm" })``;

export const Message = Object.assign(_Message, { Text: StyledText });
