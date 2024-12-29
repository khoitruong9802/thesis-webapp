import { useState } from "react";
import { Cascader, notification } from "antd";
import Button from "../Button";
import { useSelector, useDispatch } from "react-redux";
import {
  createSchedule,
  updateSchedule,
  getSchedules,
  setShowForm,
} from "../../store/slices/scheduleSlice";
import { convertCamelToSnake } from "../../utils/helper";
const { SHOW_CHILD } = Cascader;

const dayOptions = [
  { label: "Monday", value: 2 },
  { label: "Tuesday", value: 3 },
  { label: "Wednesday", value: 4 },
  { label: "Thursday", value: 5 },
  { label: "Friday", value: 6 },
  { label: "Saturday", value: 7 },
  { label: "Sunday", value: 8 },
];

const initialState = {
  scheduleName: "",
  priority: 3,
  area: 1,
  description: "",
  flow1: 0,
  flow2: 0,
  flow3: 0,
  cycle: 1,
  status: 1,
  startTime: "",
  stopTime: "",
  scheduleType: "Daily",
  startDay: "",
  endDay: "",
  days: [],
  image: "",
};

const ScheduleForm = () => {
  const { editId, schedules } = useSelector((state) => state.schedule);
  const [formData, setFormData] = useState(
    editId !== -1 ? schedules.find((item) => item.id === editId) : initialState
  );

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId === -1) {
      dispatch(
        createSchedule({
          ...convertCamelToSnake(formData),
          fertilizer_device_id: 1,
        })
      )
        .unwrap()
        .then(() => {
          notification.success({
            message: "Notification",
            duration: 10,
            description: "Schedule created successfully",
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
    } else {
      dispatch(
        updateSchedule({
          ...convertCamelToSnake(formData),
          fertilizer_device_id: 1,
        })
      )
        .unwrap()
        .then(() => {
          notification.success({
            message: "Notification",
            duration: 10,
            description: "Schedule edited successfully",
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
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result, // Base64 string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-6">Create Schedule</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Schedule Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Schedule Name
          </label>
          <input
            type="text"
            name="scheduleName"
            value={formData.scheduleName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter schedule name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {formData.image && (
            <div className="mt-2">
              <img
                src={formData.image}
                alt="Uploaded Preview"
                className="w-32 h-32 object-cover border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value={1}>Very Low</option>
            <option value={2}>Low</option>
            <option value={3}>Medium</option>
            <option value={4}>High</option>
            <option value={5}>Very High</option>
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Area</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter description"
            required
          />
        </div>

        {/* Flow Rates */}
        <div className="flex gap-4">
          {["flow1", "flow2", "flow3"].map((flow) => (
            <div key={flow}>
              <label className="block text-gray-700 font-medium mb-2">
                {flow.toUpperCase()}
              </label>
              <input
                type="number"
                name={flow}
                value={formData[flow]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          ))}
        </div>

        {/* Cycle */}
        {/* <div>
          <label className="block text-gray-700 font-medium mb-2">Cycle</label>
          <input
            type="number"
            name="cycle"
            value={formData.cycle}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
            min={1}
            required
          />
        </div> */}

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value={0}>Inactive</option>
            <option value={1}>Active</option>
          </select>
        </div>

        {/* Time Fields */}
        <div className="flex gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Time
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Stop Time
            </label>
            <input
              type="time"
              name="stopTime"
              value={formData.stopTime}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>

        {/* Schedule Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Schedule Type
          </label>
          <select
            name="scheduleType"
            value={formData.scheduleType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Once">Once</option>
          </select>
        </div>

        {/* Start and End Day */}
        <div className="flex gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Start Day
            </label>
            <input
              type="date"
              name="startDay"
              value={formData.startDay}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          {formData.scheduleType !== "Once" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                End Day
              </label>
              <input
                type="date"
                name="endDay"
                value={formData.endDay}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          )}
        </div>

        {/* Days */}
        {formData.scheduleType !== "Once" &&
          formData.scheduleType !== "Daily" && (
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Days
              </label>
              {/* <input
                type="text"
                name="days"
                value={formData.days.join(",")}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Enter days (e.g., 2,3,4)"
              /> */}
              <Cascader
                style={{
                  width: "100%",
                }}
                size="large"
                showSearch={true}
                options={dayOptions}
                onChange={(value) => {
                  const days = value.map((item) => Number(item[0]));
                  setFormData((prev) => ({ ...prev, days }));
                }}
                showCheckedStrategy={SHOW_CHILD}
                multiple
                placeholder="Select days"
                maxTagCount="responsive"
              />
            </div>
          )}

        {/* Submit Button */}
        <Button isWidthFull={true}>Save</Button>
      </form>
    </div>
  );
};

export default ScheduleForm;
