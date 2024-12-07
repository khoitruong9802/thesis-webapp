import { BellFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  getNotifications,
  setReadAll,
} from "../../services/notificationService";
import { convertSnakeToCamel } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { setNumberOfNotification } from "../../store/slices/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { numberOfNotification } = useSelector((state) => state.notification);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications();
      dispatch(setNumberOfNotification(0));
      const result = res.data.map((item) => convertSnakeToCamel(item));
      setNotifications(
        result.map((item) => ({
          ...item,
          message: item.message.slice(22),
          createAt: item.message.slice(1, 20),
        }))
      );
    };

    fetchNotifications();
  }, [numberOfNotification]);

  useEffect(() => {
    return async () => {
      await setReadAll();
    };
  }, []);

  return (
    <div className="flex flex-col w-full p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        <BellFilled className="text-yellow-400 text-3xl" />
        Notifications
      </h1>
      <div className="bg-white shadow-md rounded-lg">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            className={`flex items-center justify-between px-4 py-4 border-b ${
              notification.isRead
                ? "bg-gray-100"
                : "bg-blue-50 cursor-pointer hover:scale-[1.01] duration-200"
            } ${index === notifications.length - 1 ? "border-none" : ""}`}
          >
            <div className="flex flex-col">
              <p
                className={`${
                  notification.isRead
                    ? "text-gray-600"
                    : "text-gray-800 font-semibold"
                }`}
              >
                {notification.message}
              </p>
              <span className="text-sm text-gray-500">
                {notification.createAt}
              </span>
            </div>
            {!notification.isRead && (
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                New message
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Notification;
