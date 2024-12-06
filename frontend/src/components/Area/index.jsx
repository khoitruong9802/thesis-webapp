import { HomeFilled } from "@ant-design/icons";

const Area = ({ areaId, selected }) => {
  return (
    <div
      className={`border-2 border-green-600 cursor-pointer font-bold py-1 px-2 rounded-md ${
        selected ? "text-white bg-green-400" : ""
      }`}
    >
      <HomeFilled
        className={`${selected ? "text-white" : "text-green-600"} mr-1`}
      />
      <span>Area {areaId}</span>
    </div>
  );
};

export default Area;
