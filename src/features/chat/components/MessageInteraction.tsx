import { RateMessageForm } from "./RateMessageForm";
import { IconThumbUp } from "@tabler/icons-react";
import { IconThumbUpFilled } from "@tabler/icons-react";
import { IconThumbDown } from "@tabler/icons-react";
import { IconThumbDownFilled } from "@tabler/icons-react";

export const Like = ({ messageId } : { messageId: string | number }) => {
    <RateMessageForm
        messageId={messageId}
        raiting={1}
        icon={(<IconThumbUp />)}
        // iconSuccess={<IconThumbUpFilled/>}    
    />
}

export const Dislike = ({ messageId } : { messageId: string | number }) => {
    <RateMessageForm
        messageId={messageId}
        raiting={-1}
        icon={(<IconThumbDown />)}    
    />
}