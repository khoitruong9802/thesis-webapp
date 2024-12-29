import { useState } from "react";
import Button from "../Button";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Popconfirm, notification } from "antd";
import {
  deleteSchedule,
  getSchedules,
  updateSchedule,
  setEditId,
  setShowForm,
} from "../../store/slices/scheduleSlice";
import { useDispatch, useSelector } from "react-redux";
import kksfarm from "../../assets/images/kksfarm.jpg";

const dayMapping = ["", "", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

const Schedule = ({
  id,
  scheduleName,
  priority,
  area,
  description,
  flow1,
  flow2,
  flow3,
  cycle,
  status,
  startTime,
  stopTime,
  scheduleType,
  startDay,
  endDay,
  days,
  image,
}) => {
  const [active, setActive] = useState(status);
  const { updateLoading } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteSchedule(id))
      .unwrap()
      .then(() => {
        dispatch(getSchedules([1, 4]));
        notification.success({
          message: "Notification",
          duration: 10,
          description: "Schedule deleted successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Notification",
          duration: 10,
          description: error,
        });
      });
  };

  return (
    <div className="flex flex-wrap items-center justify-between p-4 border-2 border-gray-200 rounded-md bg-white cursor-pointer gap-y-2 hover:shadow-md hover:scale-[1.02] duration-200">
      <div className="flex gap-x-4">
        <img
          className="aspect-square size-24 rounded-lg border-2 border-purple-200"
          src={image === null || image === "" ? kksfarm : image}
          alt=""
        />
        <div className="flex flex-col gap-y-2">
          <p className="font-bold">{scheduleName}</p>
          <p>
            {startTime} - {stopTime}
          </p>
          <div className="flex">
            <div className="bg-red-200 p-1 rounded-s-lg">{flow1}L</div>
            <div className="bg-blue-200 p-1">{flow2}L</div>
            <div className="bg-yellow-200 p-1 rounded-e-lg">{flow3}L</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2 items-center">
        <div className="flex gap-x-2">
          <Button
            color="indigo"
            onClick={() => {
              dispatch(setEditId(id));
              dispatch(setShowForm(true));
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            title="Delete the schedule"
            description="Are you sure to delete this schedule?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button color="red">
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </div>

        <p className="font-medium">
          {scheduleType === "Daily"
            ? "Every day"
            : scheduleType === "Weekly"
            ? days.map((day) => dayMapping[day]).toString()
            : startDay}
        </p>
        <label
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="inline-flex items-center cursor-pointer"
        >
          <span className="text-purple-950 me-2 font-bold">
            {active ? "ACTIVE" : "INACTIVE"}
          </span>
          <input
            checked={active}
            disabled={updateLoading}
            onChange={() => {
              dispatch(
                updateSchedule({
                  id,
                  status: active ? 0 : 1,
                })
              )
                .unwrap()
                .then(() => {
                  notification.success({
                    message: "Notification",
                    duration: 10,
                    description: "Schedule status changed successfully",
                  });
                  dispatch(getSchedules([1, 4]));
                  dispatch(setShowForm(false));
                })
                .catch((error) => {
                  console.log(error);
                  notification.error({
                    message: "Notification",
                    duration: 10,
                    description: error,
                  });
                });
            }}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-purple-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-purple-700 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-400"></div>
        </label>
      </div>
    </div>
  );
};

export default Schedule;
