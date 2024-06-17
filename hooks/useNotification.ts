
interface NotificationOptions {
  body?: string;
  icon?: string;
}

type NotificationPermission = "default" | "granted" | "denied";

const useNotification = (
  title: string,
  options: NotificationOptions
): (() => void) => {
  const sendNotification = (): void => {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(
        (permission: NotificationPermission) => {
          if (permission === "granted") {
            new Notification(title, options);
          }
        }
      );
    }
  };

  return sendNotification;
};

export default useNotification;
