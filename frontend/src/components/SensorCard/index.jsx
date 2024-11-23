import SemiCircularGauge from "../SemiCircularGauge";

const SensorCard = ({ value, unit, label, color, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg shadow-md w-[210px] p-4 text-center transform transition hover:-translate-y-1 hover:cursor-pointer"
    >
      <SemiCircularGauge value={value} color={color} unit={unit} size={200} />
      <div className="text-gray-500 mt-2">{label}</div>
    </div>
  );
};

export default SensorCard;
