import React from "react";
import { 
    Anchor,
    Button, 
    Flex, 
    Text,
    Image
} from "@mantine/core";

import { playSvg } from "../../../assets";

const OpenVideoButton:React.FC<{ path: string }> = ({path}) => {
    return (
        <Anchor href={path}>
            <Button 
                role="link"
                bg="none"
                style={{border: "1.5px solid #3A3A3A"}}
            >
                <Flex gap={"sm"}>
                    <Image src={playSvg} />
                    <Text
                        fw={600}
                        fz={"md"}
                    >Open video</Text>
                </Flex>
            </Button>
        </Anchor>
    );
}

export default OpenVideoButton;