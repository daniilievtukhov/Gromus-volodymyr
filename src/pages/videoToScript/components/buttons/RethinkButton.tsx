import React, { useState } from "react"
import { IconSparkles } from "@tabler/icons-react"
import { Button } from "@mantine/core"
import { useScriptVideoStore } from "../../store/videoToScript"

interface Props {
    onSubmit: () => void,
}

export const RethinkButton:React.FC<Props> = ({ onSubmit }) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Button 
            size="lg" 
            color="white" 
            fz="md" 
            variant="outline"
            onClick={async () => {
                    setLoading(true);
                    const res = await onSubmit();
                    useScriptVideoStore.setState(res.data);
                    setLoading(false);
                }
            }
            loading={loading}
        >
            <IconSparkles style={{ marginRight: 4 }} />
            Rethink
      </Button>
    )
}