import React from "react"
import { IconEdit } from "@tabler/icons-react"
import { Button } from "@mantine/core"

interface Props {
    setEditable: (editable: boolean) => void
}

export const EditButton:React.FC<Props> = ({setEditable}) => {
    return (
        <Button 
        size="lg" 
        color="white" 
        fz="md" 
        variant="outline"
        onClick={() => setEditable(true)}
      >
        <IconEdit style={{ marginRight: 4 }} />
        Edit
      </Button>     
    )
}