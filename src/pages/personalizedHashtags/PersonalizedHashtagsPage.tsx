import {
  Stack,
  Alert,
  createPolymorphicComponent,
  ButtonProps,
  Button,
  Flex,
  Skeleton,
  ScrollArea,
  Tabs,
  Space,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle, IconMoodSad, IconPlayerPlay, IconSparkles } from "@tabler/icons-react";
import { TopFiveHashtags } from "../../features/hashtags/TopFiveHashtags";
import { BalancedGroups } from "../../features/hashtags/BalancedGroups";
import { HashtagsModal } from "../../features/hashtags/HashtagsModal";
import { useHashtagFilters } from "./hooks/useHashtagFilters";
import { useHashtagsAnalyticsData } from "./hooks/useHashtagsAnalyticsData";
import { useState, useEffect } from "react";
import { useHashtags } from "../../features/hashtags/store/hashtags";
import { ApiHashtagsAnalytics } from "../../requests/hashtagsAnalytics";
import { HashtagGroupsTitle } from "../../components/HashtagGroupsTitle";
import { pricingModal } from "../../pages/pricing/hooks/triggerPricingModalHook";

import { isAxiosError } from "axios";
import styled from "styled-components";

import classes from "./HashtagsPage.module.css";
import { useNavigate } from "react-router-dom";
import { AnimatedButtonDark } from "../../components/AnimatedButton";
import { useHowItWorkStore } from "../../features/greeting/store";
import { openVideoModalTutorial, useGlobalStore } from "../../globalStore";

export const PersonalizedHashtagsPage = () => {
  const {
    data: hashtagsFilter,
    isSuccess: isSuccessHashtagsFilter,
    isFetching: isFetchingFilters,
  } = useHashtagFilters();
  const { data, isSuccess, isError, error, isFetching } = useHashtagsAnalyticsData({
    country: hashtagsFilter?.country,
    category: hashtagsFilter?.category,
  });

  const [opened, { open, close }] = useDisclosure(true);
  const pricing = pricingModal();
  const clicked = useHowItWorkStore((state) => state.clicked);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtherCategory, setIsOtherCategory] = useState(false);

  const [topSoundHashtags, setTopSoundHashtags] = useState<ApiHashtagsAnalytics.ISoundHashtag[]>(
    [],
  );
  const [soundHashtagBalancedGroup, setSoundHashtagBalancedGroup] = useState<
    ApiHashtagsAnalytics.IHashtagBalance[]
  >([]);
  const [accountHashtagBalancedGroup, setAccountHashtagBalancedGroup] = useState<
    ApiHashtagsAnalytics.IHashtagBalance[]
  >([]);

  const store = useHashtags();
  const navigate = useNavigate();
  useEffect(() => {
    if (
      store.accountHashtagBalancedGroup &&
      store.soundHashtagBalancedGroup &&
      store.topSoundHashtags
    ) {
      // console.log(store);
      setTopSoundHashtags(store.topSoundHashtags);
      setSoundHashtagBalancedGroup(store.soundHashtagBalancedGroup);
      setAccountHashtagBalancedGroup(store.accountHashtagBalancedGroup);
    }
  }, [store]);

  useEffect(() => {
    if (
      data &&
      !store.accountHashtagBalancedGroup.length &&
      !store.topSoundHashtags.length &&
      !store.soundHashtagBalancedGroup.length
    ) {
      setTopSoundHashtags(data.topSoundHashtags);
      setSoundHashtagBalancedGroup(data.soundHashtagBalancedGroup);
      setAccountHashtagBalancedGroup(data.accountHashtagBalancedGroup);
    }
  }, [data]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (hashtagsFilter?.category === 106) {
      setIsOtherCategory(true);
    } else setIsOtherCategory(false);
  }, [hashtagsFilter?.category]);

  if (isError) {
    if (isAxiosError(error) && error.response?.status === 400) {
      return (
        <Stack align="center" justify="center" p={32} pb={102} gap={52} bg="#0D0D0E" mih="100vh">
          <Alert variant="light" color="orange" title="Hashtags not found" icon={<IconMoodSad />}>
            We currently do not have data for your hashtag parameters. They will appear soon.
          </Alert>
        </Stack>
      );
    } else {
      if (isAxiosError(error) && error.response?.status === 403) {
        return (
          <>
            <Stack
              align="center"
              justify="center"
              p={32}
              pb={102}
              gap={52}
              bg="#0D0D0E"
              mih="100vh"
            >
              <Alert variant="light" color="orange" title="Limitation" icon={<IconMoodSad />}>
                You're over your limit
              </Alert>
            </Stack>
            <Modal
              opened={opened}
              onClose={close}
              withCloseButton={false}
              title="The limit's up."
              centered
            >
              <Stack align="center">
                You have reached the limit in your plan. For further use, buy a more advanced plan.
              </Stack>
              <Flex pt={5} gap={10} justify="center">
                <Button
                  variant="filled"
                  color="lime.4"
                  c="black"
                  onClick={() => {
                    close();
                    pricing.openModal();
                  }}
                >
                  Pricing
                </Button>
                <Button variant="filled" color="gray" onClick={close}>
                  Discard
                </Button>
              </Flex>
            </Modal>
          </>
        );
      }
      return (
        <Flex align="center" justify="center" h="100vh">
          <Alert variant="light" color="orange" icon={<IconInfoCircle />}>
            Something went wrong. We are working on getting this fixed as soon as we can.
          </Alert>
        </Flex>
      );
    }
  }
  const openHashtags = () => {
    setIsOtherCategory(false);
    navigate("/hashtags");
  };

  const handleHowItWorks = () => {
    useHowItWorkStore.setState({ clicked: true });
    openVideoModalTutorial("https://youtube.com/shorts/u0SZHFHPbhs", "Personalized Hashtags");
  };
  if (isSuccessHashtagsFilter && isSuccess && data && isOtherCategory) {
    return (
      <Stack p={32} pb={102} gap="md" bg="#0D0D0E" mih="100vh" align="center" justify="center">
        <Alert w="70%" variant="light" color="0D0D0E" classNames={classes}>
          Our AI needs to analyze your next 2-3 videos and listen to your sounds to determine the
          niche audience of your account 😌. Therefore, we cannot suggest hashtags for your niche.
          ⚡️ However, we will be happy to show you the growing hashtags in your country today.
        </Alert>
        <StyledButton onClick={openHashtags}>
          <Flex justify="center" align="center" gap="sm">
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_2834_7501)">
                <path
                  d="M13.1833 7.81221C13.3201 7.64157 13.5184 7.53151 13.7356 7.50579C13.9528 7.48007 14.1713 7.54074 14.3442 7.67471L14.4225 7.74388L17.7558 11.0772C17.8854 11.2068 17.9685 11.3755 17.9925 11.5572L18 11.6664V15.833C18 16.0372 17.925 16.2342 17.7894 16.3867C17.6538 16.5392 17.4669 16.6367 17.2642 16.6605L17.1667 16.6664H3.815L3.72333 16.6589L3.63167 16.6422L3.5425 16.6139L3.455 16.5755L3.37167 16.5264L3.29333 16.468L3.24333 16.4222L3.18333 16.3539L3.13 16.2797L3.085 16.1997L3.07167 16.1705L3.03833 16.0847L3.01583 15.9964L3.00333 15.9064L3 15.8147L3.0075 15.723L3.02333 15.6355C3.03167 15.6022 3.04167 15.5714 3.0525 15.5422L3.09083 15.4547L3.14 15.3714L6.47333 10.3714C6.57593 10.2169 6.72711 10.1011 6.90296 10.0422C7.0788 9.98335 7.26925 9.98481 7.44417 10.0464L7.53917 10.088L10.27 11.453L13.1825 7.81221H13.1833Z"
                  fill="black"
                />
                <path
                  d="M13.1934 2.80021C13.3317 2.63409 13.5291 2.52819 13.744 2.50487C13.9588 2.48155 14.1744 2.54262 14.3451 2.67521L14.4226 2.74437L17.7559 6.07771C17.9054 6.22767 17.9921 6.4289 17.9986 6.64053C18.005 6.85215 17.9307 7.0583 17.7907 7.2171C17.6507 7.37591 17.4554 7.47546 17.2447 7.49554C17.0339 7.51562 16.8234 7.45472 16.6559 7.32521L16.5776 7.25604L13.8892 4.56854L10.3067 8.86687C10.1979 8.99741 10.0518 9.09156 9.88794 9.13669C9.7241 9.18182 9.55038 9.17578 9.39006 9.11937L9.29423 9.07854L6.58256 7.72354L4.50006 10.5002C4.37832 10.6626 4.20152 10.7749 4.00283 10.8162C3.80415 10.8575 3.59723 10.8248 3.4209 10.7244L3.3334 10.6669C3.17104 10.5451 3.05869 10.3683 3.01742 10.1696C2.97615 9.97096 3.00879 9.76404 3.10923 9.58771L3.16673 9.50021L5.66673 6.16687C5.77361 6.02452 5.92325 5.92013 6.09376 5.869C6.26426 5.81786 6.44666 5.82267 6.61423 5.88271L6.7059 5.92187L9.4484 7.29271L13.1934 2.80021Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_2834_7501">
                  <rect width="20" height="20" fill="white" transform="translate(0.5)" />
                </clipPath>
              </defs>
            </svg>
            <div>Show Hashtags</div>
          </Flex>
        </StyledButton>
      </Stack>
    );
  } else {
    return (
      <Stack gap={128} px={40} py={32} mih="100vh" bg="#0D0D0E" justify="space-between">
        {isFetching && (
          <Stack>
            <Stack gap={24}>
              <Tabs defaultValue="geo">
                <Tabs.Panel value="geo">
                  <ScrollArea scrollbarSize={8} offsetScrollbars>
                    <Flex gap={12} align={"stretch"} py={12}>
                      {[1, 2, 3, 4, 5, 6].map((el) => (
                        <Flex gap={4} key={el}>
                          <Skeleton h={200} w={280} />
                        </Flex>
                      ))}
                    </Flex>
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Stack>
            <Space></Space>
            <Stack gap={24}>
              <Tabs defaultValue="geo">
                <Tabs.Panel value="geo">
                  <ScrollArea scrollbarSize={8} offsetScrollbars>
                    <Flex gap={12} align={"stretch"} py={12}>
                      {[1, 2, 3, 4, 5, 6].map((el) => (
                        <Flex gap={4} key={el}>
                          <Skeleton h={200} w={280} />
                        </Flex>
                      ))}
                    </Flex>
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Stack>
            <Space></Space>
            <Stack gap={24}>
              <Tabs defaultValue="geo">
                <Tabs.Panel value="geo">
                  <ScrollArea scrollbarSize={8} offsetScrollbars>
                    <Flex gap={12} align={"stretch"} py={12}>
                      {[1, 2, 3, 4, 5, 6].map((el) => (
                        <Flex gap={4} key={el}>
                          <Skeleton h={200} w={280} />
                        </Flex>
                      ))}
                    </Flex>
                  </ScrollArea>
                </Tabs.Panel>
              </Tabs>
            </Stack>
          </Stack>
        )}
        {isModalOpen && <HashtagsModal onClose={closeModal} />}
        {!isFetching && isSuccess && data && (
          <Stack gap={12}>
            <Flex justify="start" gap="md" align="center" wrap="wrap">
              <HashtagGroupsTitle title="sounds" country={hashtagsFilter?.country} />
              <Flex align="center" justify="center" w="45%">
                <AnimatedButtonDark
                  clicked={clicked}
                  onClick={handleHowItWorks}
                  title="How it works"
                  icon={<IconPlayerPlay size={10} />}
                />
              </Flex>
            </Flex>
            <TopFiveHashtags topSoundHashtags={topSoundHashtags} />
            <HashtagGroupsTitle title="music niche" country={hashtagsFilter?.country} />
            <BalancedGroups
              accountHashtagBalancedGroup={soundHashtagBalancedGroup}
              openModal={openModal}
            />
            <HashtagGroupsTitle title="your niche" country={hashtagsFilter?.country} />
            <BalancedGroups
              accountHashtagBalancedGroup={accountHashtagBalancedGroup}
              openModal={openModal}
            />
          </Stack>
        )}
      </Stack>
    );
  }
};

export const StyledButton = createPolymorphicComponent<"button", ButtonProps>(styled(Button).attrs({
  size: "lg",
  variant: "white",
})<ButtonProps>`
  font-size: var(--mantine-font-size-xs);
  font-weight: 700;
  color: black;
`);
