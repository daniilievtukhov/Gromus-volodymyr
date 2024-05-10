import { Box, Button, Group, Stack, Text, Title, Space } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { useEffect, useRef } from "react";

import { IAuthState } from "../types";
import { openVideoModalTutorial } from "../../../globalStore";
import { useHowItWorkStore } from "../../greeting/store";
import { ModalVideo } from "../../greeting/components/ModalVideo";

gsap.registerPlugin(TextPlugin);

interface IProps {
  onChange: (state: IAuthState) => void;
}

export const AuthStart = ({ onChange }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline();
    const titleEl = ref.current.querySelector(".title"),
      textEl = ref.current.querySelector(".text"),
      buttonsEl = ref.current.querySelector(".buttons");

    tl.to(titleEl, { text: title, duration: 1, delay: 0.5 });
    tl.to(textEl, { text: text, duration: 5 });
    tl.fromTo(buttonsEl, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 });
    setTimeout(() => {
      openVideoModalTutorial("https://youtu.be/_u4WZWamhRM", "Introduction");
    }, 8000);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Stack gap={21} w={600} c="white" ref={ref}>
      <Group gap={8}>
        <IconSparkles />
        <Text fw={600}>Welcome to GROMUS. AI</Text>
      </Group>
      <Stack gap={45}>
        <Box pos="relative">
          <Title size="2rem" opacity={0} dangerouslySetInnerHTML={{ __html: title }} />
          <Title size="2rem" pos="absolute" top={0} className="title" />
        </Box>
        <Box pos="relative">
          <Text ff="mono" opacity={0} dangerouslySetInnerHTML={{ __html: text }} />
          <Text ff="mono" pos="absolute" top={0} className="text" />
        </Box>
        <Group gap={10} className="buttons">
          <Button
            size="xl"
            color="black"
            fz="md"
            variant="white"
            onClick={() => onChange("methods")}
          >
            Sign-up
          </Button>
          <Button
            size="xl"
            color="white"
            fz="md"
            variant="outline"
            onClick={() => onChange("logIn")}
          >
            Log In
          </Button>
          <ModalVideo />
        </Group>
      </Stack>
    </Stack>
  );
};

const title = "GROW YOUR CONTENT ORGANICALLY WITH GROMUS.AI";
const text = `Hey there! GROMUS.AI will be your personalized guide to unlock the full potential of your content on social media and music streaming platforms.
<br /><p>Authorize through your TikTok account to get full analytics of your account (understand the dynamics of your specific category, your competitors, and which countries TikTok recommends your content)
<ul> <li> Be the first to know all the TikTok rising and viral sounds and videos around the globe</li>
<li> Get personalized recommendations on the best times to post, trending hashtags, and the most effective viral sounds to enhance your publications.<br /></li>
<li> Use our 'Video to Text' feature where our AI transforms video content into compelling scripts, suggesting edits and improvements for your next viral video <br /></li>
  </ul><br />
  Join NOW and test it for yourself!`;
