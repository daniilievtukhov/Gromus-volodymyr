import { Grid, Group, lighten, Stack, Text, Title, TypographyStylesProvider } from "@mantine/core";
import {
  IconBrandYoutubeFilled,
  IconHash,
  IconHeadphonesFilled,
  IconSparkles,
  IconUserFilled,
} from "@tabler/icons-react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useThrottledCallback } from "use-debounce";

import { useLayoutStore } from "../../../layoutStore";
import { useGreetingStore } from "../store";
import { Benefit } from "./Benefit";
import { ModalVideo } from "./ModalVideo";

gsap.registerPlugin(TextPlugin);

export const Greeting = () => {
  const ref = useAnimation();

  return (
    <Wrapper
      onClick={(e) => {
        if ((e.target as HTMLElement).getAttribute("data-type") === "ai-mode") {
          useGreetingStore.setState({ greeted: true });
          useLayoutStore.setState({
            chatOpened: true,
            navbarOpened: false,
          });

          return;
        }

        if ((e.target as HTMLElement).getAttribute("data-type") === "pro-mode") {
          useGreetingStore.setState({ greeted: true });
          useLayoutStore.setState({
            chatOpened: false,
            navbarOpened: true,
          });
        }
      }}
    >
      <Stack gap={48} w={500} c="white" ref={ref}>
        <Stack gap={21}>
          <Group gap={8}>
            <IconSparkles />
            <Text fw={600}>Welcome aboard</Text>
          </Group>
          <Title size="3rem" className="title" />
        </Stack>

        <ModalVideo />
        <TypographyStylesProvider>
          <Stack gap={25}>
            <Text className="text1" />
            <Grid gutter={10}>
              <Grid.Col span={6}>
                <Benefit
                  icon={<IconBrandYoutubeFilled />}
                  title="33M+"
                  description="Videos"
                  className="benefit"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Benefit
                  icon={<IconUserFilled />}
                  title="400K+"
                  description="Influencers"
                  className="benefit"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Benefit
                  icon={<IconHeadphonesFilled />}
                  title="200K+"
                  description="Sounds"
                  className="benefit"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Benefit
                  icon={<IconHash />}
                  title="5M+"
                  description="Hashtags"
                  className="benefit"
                />
              </Grid.Col>
            </Grid>
            <Text className="text2" />
          </Stack>
        </TypographyStylesProvider>
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .link-button {
    cursor: pointer;
    color: #bce30f;
    font-weight: bold;
    text-decoration: underline;

    &:hover {
      color: ${lighten("#bce30f", 0.5)};
    }
  }

  a {
    text-decoration: underline;
  }
`;

const title = "The GROMUS Universe community! 🎉";

const text1 = `
  Congratulations on joining us! Before we kickstart this musical journey together, let's get to know each other better.
  <br><br>
  I am GI, your AI copilot, armed with cutting-edge algorithms and machine learning prowess. I'm here to enhance every step of your musical adventure, from advising you on how to create captivating social media content to optimizing your music release plans.
  <br><br>
  I’ll dive into your music, genre trends, and audience preferences to guide you towards the most impactful promotional methods, helping you make your mark in the competitive world of music.
  <br><br>
  Consider me your dedicated music strategist, offering actionable insights and tailor -made advice whenever you need it. Whether it's choosing the best time to release your newest song, identifying the hashtags that will get you noticed, or creating personalized playlists that showcase your unique sound, I've got your back.
`;

const text2 = `
  So, how can we work together?
  <br><br>
  <b>I’m all ears. What’s your question?</b>
  <br><br>
  Also, there are 2 ways to navigate the platform: OR Choose your way to navigate our platform
  <br><br>
  <span class="link-button" data-type="pro-mode">Pro Mode:</span>
  <br><br>
  Prefer to navigate the platform on your own? Switch to <a href="https://pro.gromus.ai/" target="_blank">Pro mode</a> and have access to data and analytics using menu navigation without me.
  <br><br>
  <span class="link-button" data-type="ai-mode">AI Copilot Mode:</span>
  <br><br>
  Let me be your personal assistant. Simply share a link to your sound or account, and I'll provide you with personalized recommendations and analytics. You can also ask me about any account or sound, and I'll swiftly provide you with analytics or a summary of the results.
  <br><br>
  Why choose Me? I will help to empower you with the tools and knowledge you need to thrive in the dynamic world of music. Let's make some magic together!
`;

const useAnimation = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldScroll, setShouldScroll] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    const st = window.scrollY;
    if (st < lastScrollTop) setShouldScroll(false);
    setLastScrollTop(st <= 0 ? 0 : st);
  }, [lastScrollTop]);
  const onUpdate = useThrottledCallback(
    () => {
      shouldScroll && document.body?.scrollIntoView({ block: "end", behavior: "smooth" });
    },
    200,
    { leading: true, trailing: false },
  );

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline({ onUpdate });
    const titleEl = ref.current.querySelector(".title");
    const text1El = ref.current.querySelector(".text1");
    const text2El = ref.current.querySelector(".text2");
    const benefitEls = ref.current.querySelectorAll(".benefit");

    tl.to(titleEl, { text: title, duration: 1, delay: 1 });
    tl.to(text1El, { text: text1, duration: 5 });
    benefitEls.forEach((el) =>
      tl.fromTo(
        el,
        { display: "none", opacity: 0, y: -10 },
        { display: "block", opacity: 1, y: 0, duration: 0.5 },
      ),
    );
    tl.to(text2El, { text: text2, duration: 15 });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return ref;
};
