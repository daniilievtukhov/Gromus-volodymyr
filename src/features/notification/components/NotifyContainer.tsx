import { Notification } from "@mantine/core";
import styled from "styled-components";

import { useNotificationStore } from "../store";
import { INotificationType } from "../type";

export const NotifyContainer = () => {
  const { stack, remove } = useNotificationStore();

  return (
    <Wrapper>
      {stack.map((el) => (
        <Notification
          key={el.id}
          color={colorByType[el.type]}
          title={el.title}
          onClose={() => remove(el.id)}
          withBorder
        >
          {el.description}
        </Notification>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 300px;
  padding: 15px;
`;

const colorByType: Record<INotificationType, string> = {
  error: "red",
  success: "green",
};
