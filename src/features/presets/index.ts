import { useNavigate } from "react-router-dom";

export const Presets = () => {
  const navigate = useNavigate();
  const presetButtons = [
    {
      label: "US",
      onClick: () =>
        navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=US"),
    },
    {
      label: "UK",
      onClick: () =>
        navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=GB"),
    },
    {
      label: "MX",
      onClick: () =>
        navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=MX"),
    },
    {
      label: "UA",
      onClick: () =>
        navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20&videosLocation=UA"),
    },
    {
      label: "World",
      onClick: () => navigate("/rising-sounds?sorting=rise&days=1&order=desc&take=20"),
    },
  ];
  const defaultButtons = [
    {
      label: "Time to post",
      onClick: () => navigate("/time-to-post"),
    },
    {
      label: "Account analytics",
      onClick: () => navigate("/my-account-analytics"),
    },
    {
      label: "Rising Sounds",
      onClick: () => navigate("/rising-sounds"),
    },
    {
      label: "Hashtags",
      onClick: () => navigate("/hashtags"),
    },
  ];

  const HashtagButton = {
    label: "Hashtags",
    onClick: () =>
      navigate(
        "https://react.gromus.ai/api/Statistics/TimeToPost?country=US&category=128&followers=10000",
      ),
  };
  const AccountButton = {
    label: "Account analytics",
    onClick: () => navigate("/my-account-analytics"),
  };
  const TimeButton = {
    label: "Time to post",
    onClick: () => navigate("/time-to-post"),
  };

  return { presetButtons, defaultButtons, HashtagButton, AccountButton, TimeButton };
};
