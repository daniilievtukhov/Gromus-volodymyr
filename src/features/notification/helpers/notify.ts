import { useNotificationStore } from "../store";
import { INotification, INotificationType } from "../type";

const notifyFabric =
  (type: INotificationType) => (settings: string | Omit<INotification, "type">) => {
    const notification: INotification = {
      ...(typeof settings === "string" ? { title: settings } : settings),
      type,
    };

    useNotificationStore.getState().add(notification);
  };

export const notify: Record<
  INotificationType,
  (settings: string | Omit<INotification, "type">) => void
> = {
  error: notifyFabric("error"),
  success: notifyFabric("success"),
};
