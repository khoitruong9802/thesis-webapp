import { BellFilled } from "@ant-design/icons";

const Notification = () => {
  // const notifications = [
  //   "(2024-12-05 11:38:44) Lich tuoi dao has been completed",
  //   "(2024-12-05 11:38:33) Lich tuoi dao is 80.0% complete",
  //   "(2024-12-05 11:38:22) Lich tuoi dao is 60.0% complete",
  //   "(2024-12-05 11:38:11) Lich tuoi dao is 40.0% complete",
  //   "(2024-12-05 11:38:00) Lich tuoi dao is 20.0% complete"
  // ]

  const notifications = [
    {
      id: 1,
      message: "Your schedule is running successfully",
      createAt: "10:30 AM",
      isRead: false,
    },
    {
      id: 2,
      message: "Warning: High nitrogen detected!",
      createAt: "09:45 AM",
      isRead: false,
    },
    {
      id: 3,
      message: "Morning routine completed",
      createAt: "08:15 AM",
      isRead: true,
    },
    {
      id: 4,
      message: "New update available for your system",
      createAt: "07:00 AM",
      isRead: true,
    },
  ];

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
