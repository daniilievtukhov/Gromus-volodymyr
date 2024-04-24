import React from "react";
import { 
    Anchor,
    Button, 
    Flex, 
    Text,
    Image
} from "@mantine/core";

import { inspectSvg } from "../../../assets";

const InspectButton:React.FC<{ path: string }> = ({path}) => {
    return (
        <Anchor href={path}>
            <Button 
                role="link"
                bg="#3A3A3A"
                style={{border: "1.5px solid #3A3A3A"}}
            >
                <Flex gap={"sm"}>
                    <Text
                        fw={600}
                        fz={"md"}
                    >Inspect</Text>
                    <Image src={inspectSvg} />
                </Flex>
            </Button>
        </Anchor>
    );
}

export default InspectButton;