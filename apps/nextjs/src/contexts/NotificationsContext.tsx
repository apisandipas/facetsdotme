import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { NotificationBanner, XIcon } from "@facets/ui";

type NotificationType = "notification" | "error" | "warning";

interface Notification {
  message: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: ({
    message,
    type,
  }: {
    message: string;
    type?: NotificationType;
  }) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (notification) {
      timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // change the timeout as per your need
    }
    return () => clearTimeout(timer);
  }, [notification]);

  const showNotification = ({
    message,
    type,
  }: {
    message: string;
    type: NotificationType;
  }) => {
    setNotification({ message, type });
  };

  const value = { showNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notification && (
        <NotificationBanner
          type={notification.type || "notification"}
          show={!!notification}
        >
          <div>{notification.message}</div>
          <XIcon />
        </NotificationBanner>
      )}
    </NotificationContext.Provider>
  );
}
