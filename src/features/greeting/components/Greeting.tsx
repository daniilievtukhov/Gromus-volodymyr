import {
  Grid,
  Group,
  lighten,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  Popover,
  Button,
  Flex,
} from "@mantine/core";
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
import { useDisclosure } from "@mantine/hooks";
import ReactPlayer from "react-player";

gsap.registerPlugin(TextPlugin);

export const Greeting = () => {
  const ref = useAnimation();
  const [opened, { close, open }] = useDisclosure(false);
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
          <ReactPlayer
            className="video"
            url="https://youtu.be/_u4WZWamhRM"
            width="100%"
            controls={true}
          />
        </Stack>

        <ModalVideo />
        <TypographyStylesProvider>
          <Stack gap={25} align="center">
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
            <Flex justify="space-around" w="100%">
              <Popover width={200} position="bottom" withArrow shadow="md" id="button">
                <Popover.Target>
                  <Button color="lime.4" c="black">
                    Pro Mode
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="xs">
                    Have some complex requests and analytics you want to check? <br />I GOT YOU!
                    <br />
                    CHECK OUT
                    <a href="https://pro.gromus.ai/" target="_blank">
                      PRO.GROMUS
                    </a>
                    Navigate the platform on your own and build your data reports using our advanced
                    filters.
                  </Text>
                </Popover.Dropdown>
              </Popover>

              <Popover width={200} position="bottom" withArrow shadow="md" id="button">
                <Popover.Target>
                  <Button color="lime.4" c="black">
                    Copilot AI Mode
                  </Button>
                </Popover.Target>
                <Popover.Dropdown>
                  <Text size="xs">
                    Let me be your personal assistant. Just hit the "Hello G" button and simply
                    share a link to your sound or account, and I'll provide you with personalized
                    recommendations and analytics.
                  </Text>
                </Popover.Dropdown>
              </Popover>
            </Flex>
            <Text className="text3" />
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
const title = "WELCOME To GROMUS.AI 🎉";

const text1 = `
  Welcome onboard! <br/>
Before we kickstart our journey together, let's get to know each other better.

  <br><br>
I am GROMUS. AI G, your guide, armed with millions of data insights and cutting-edge AI algorithms.
I'm here to help you with every step of your content creation from analyzing your content to providing you tools for creating your next viral content.
enhance every step of your musical adventure, from advising you on how to create captivating social media content to optimizing your music release plans.

  <br><br>
<b>Right now I am pro</b> at TikTok, so use the TikTok authorization to unlock my full potential.
But I am learning about more platforms`;

const text2 = `
 There are 2 ways of using me:
  <br><br>
  ◀️ On your left - all the key insights you need in day-to-day content creation:
<ul>
<li>Your TikTok account analytics</li>
<li>Best time to post your content recommendations</li>
<li>Viral and trending hashtags to boost your visibility</li>
<li>Video to Text feature, upload any video from TikTok, Instagram Reels and get recommended script to use for your next video</li>
<li>Rising sounds and Sounds of the day in your country</li>
</ul>
  <br><br>
   ▶️On your right - your personal assistant and copilot in GROMUS UNIVERSE

<ul>
<li>Ask away any Q you have around your account</li>
<li>Want to know insights about your competitors?</li>
<li>Find out what sounds are viral in Canada? Or in the UK?</li>
<li>Want to know the best time to post in any country and get recommendations in what country to release your content to get it viral? 
</li>
</ul>
`;

const text3 = `
<br><br>READY TO START?
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
    const text3El = ref.current.querySelector(".text3");
    const video = ref.current.querySelector(".video");
    const benefitEls = ref.current.querySelectorAll(".benefit");
    const buttons = ref.current.querySelectorAll("#button-target");

    tl.to(titleEl, { text: title, duration: 1, delay: 1 });
    tl.fromTo(
      video,
      { display: "none", opacity: 0, y: -10 },
      { display: "block", opacity: 1, y: 0, duration: 0.5 },
    );
    tl.to(text1El, { text: text1, duration: 10 });
    benefitEls.forEach((el) =>
      tl.fromTo(
        el,
        { display: "none", opacity: 0, y: -10 },
        { display: "block", opacity: 1, y: 0, duration: 0.5 },
      ),
    );
    tl.to(text2El, { text: text2, duration: 12 });
    buttons.forEach((el) =>
      tl.fromTo(
        el,
        { display: "none", opacity: 0, y: -5 },
        { display: "block", opacity: 1, y: 0, duration: 0.5 },
      ),
    );
    tl.to(text3El, { text: text3, duration: 4 });
    return () => {
      tl.kill();
    };
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return ref;
};
