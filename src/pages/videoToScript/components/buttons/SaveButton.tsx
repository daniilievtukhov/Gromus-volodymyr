import React from "react";
import { Button } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";

interface SaveButtonProps {
    saveButtonLoading: boolean
    onSubmitText: string;
    originalText: string;
    onSubmit: () => void; 
}

export const SaveButton: React.FC<SaveButtonProps> = ({ saveButtonLoading, onSubmitText, originalText, onSubmit }) => {

    return (
        <Button
            size="lg" 
            color="rgba(209, 253, 10, 1)"
            c="black"
            variant="filled"
            fz="md" 
            disabled={onSubmitText === originalText}
            type="submit"
            onClick={(e) => {
                    e.preventDefault()
                    onSubmit()
                }
            }

            loading={saveButtonLoading}
        >
            <IconEdit style={{ marginRight: 4 }} />
            Save changes
        </Button>     
    );
};
