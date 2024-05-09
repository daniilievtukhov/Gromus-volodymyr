import { Group, Image, Text, CopyButton } from "@mantine/core";
import { tiktokWhite, instagramOutline } from "../../../assets/index";
import { IconCopy, IconCheckbox } from "@tabler/icons-react";

const socialMediaSvg = (path: string) => {
  if (path.includes("tiktok")) {
    return tiktokWhite;
  }

  if (path.includes("instagram")) {
    return instagramOutline;
  }

  return tiktokWhite;
};

const SocialMediaLink: React.FC<{ id: string | number; path: string; title: string | null }> = ({
  id,
  path,
  title,
}) => {
  return (
    <Group key={id}>
      <div style={{ borderRadius: "100%", padding: "15px", background: "#212122", margin: "3px" }}>
        <Image src={socialMediaSvg(path)} width={"20px"} height={"20px"} />
      </div>
      <Text c={"white"} underline="never" fw={"600"}>
        {title
          ? title?.length > 25
            ? title.slice(0, 18) + "..."
            : title
          : path.includes("tiktok")
          ? "TikTok Reels"
          : "Instagram Reels"}
      </Text>
      <CopyButton value={path} timeout={3000}>
        {({ copied, copy }) =>
          !copied ? <IconCopy onClick={copy} style={{ cursor: "pointer" }} /> : <IconCheckbox />
        }
      </CopyButton>
    </Group>
  );
};

export default SocialMediaLink;
