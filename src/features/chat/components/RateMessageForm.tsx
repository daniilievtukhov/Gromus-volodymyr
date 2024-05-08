import { Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

interface IProps {
    messageId: string | number,
    raiting: number,
    icon: React.ReactNode
}

export const RateMessageForm: React.FC<IProps> = ({ messageId, raiting, icon }) => {
    const rateForm = useForm({
        mode: 'uncontrolled',
        
        initialValues: {
          messageId: "",
          raiting: 0
        }
    });

    return (
        <form onSubmit={rateForm.onSubmit((values) =>  ({...values, messageId, raiting }))}>
            <Button
                type="submit"

            >
                {icon}
            </Button>
        </form>
    );
}
