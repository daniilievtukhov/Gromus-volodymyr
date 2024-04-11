export type INotificationType = "error" | "success";

export interface INotification {
  id?: string;
  type: INotificationType;
  title: string;
  description?: string;
  autoclose?: boolean | number;
}
