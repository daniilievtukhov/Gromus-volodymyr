import React from "react"
import { IconEdit } from "@tabler/icons-react"
import { Button, CopyButton, Group } from "@mantine/core"
import { IconCopyCheck, IconCopy } from "@tabler/icons-react"

interface Props {
    copiedItem: any
    size: string,
}

export const CopyButtonScript:React.FC<Props> = ({copiedItem, size}) => {
    return (
        <CopyButton value={copiedItem} timeout={3000}>
            {({ copied, copy }) => (
                <Button
                    size={size}
                    color="rgba(58, 58, 58, 1)"
                    variant="filled"
                    style={{ color: "white" }}
                    onClick={copy}
                >
                    
                    {copied ? <IconCopyCheck/> : <IconCopy size={"1rem"} style={{ marginRight: 4 }} />}
                    Copy
                </Button>
            )}
        </CopyButton>   
    )
}

