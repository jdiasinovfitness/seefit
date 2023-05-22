export interface NotificationData {
  title: string;
  subtitle: string;
  description?: string;
  type?: string;
  date?: string;
  icon?: string;
  isRead: boolean;
  isOpen?: boolean;
}
