import React from "react";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useState } from "react";

interface SaveButtonProps {
    onSubmitText: string;
    originalText: string;
    onSubmit: () => void; 
}

export const SaveButton: React.FC<SaveButtonProps> = ({ onSubmitText, originalText, onSubmit }) => {
  const [ loading, setLoading] = useState<boolean>(false);

    return (
        <Button
            size="lg" 
            color="rgba(209, 253, 10, 1)"
            c="black"
            variant="filled"
            fz="md" 
            disabled={onSubmitText === originalText}
            type="submit"
            onClick={ async (e) => {
                    setLoading(true)  
                    await onSubmit()
                    setLoading(false)  
                }
            }

            loading={loading}
        >
            <IconEdit style={{ marginRight: 4 }} />
            Save changes
        </Button>     
    );
};
