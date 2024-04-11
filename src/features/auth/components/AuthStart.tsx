import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import { IconSparkles } from "@tabler/icons-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { useEffect, useRef } from "react";

import { IAuthState } from "../types";

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

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Stack gap={21} w={550} c="white" ref={ref}>
      <Group gap={8}>
        <IconSparkles />
        <Text fw={600}>Welcome to Copilot: GI</Text>
      </Group>
      <Stack gap={45}>
        <Box pos="relative">
          <Title size="3rem" opacity={0} dangerouslySetInnerHTML={{ __html: title }} />
          <Title size="3rem" pos="absolute" top={0} className="title" />
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
        </Group>
      </Stack>
    </Stack>
  );
};

const title = "Unleash Your Musical Potential with AI Copilot: GI";
const text = `Hey there! I'm GI, your co-pilot, an AI Assistant in GROMUS Universe. <br />
  I'm excited to help out musicians like yourself. <br />
  My main mission? To provide you with personalized recommendations, targeted hashtags,
  curated playlists, insightful analytics, and more, all geared towards boosting your
  music to another level.
  <br />
  <br />
  I'll be keeping a close eye (or ear!) on your music, checking out your genre buddies,
  taking a deep dive into your country’s music scene and sounds, to provide you with
  customized guidance on how to elevate your music career. <br />
  <br />
  Register now and let's raise your music to the new heights!`;
