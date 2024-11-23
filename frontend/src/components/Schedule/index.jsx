import { useState } from "react";

const Schedule = ({
  scheduleName,
  startTime,
  stopTime,
  flow1,
  flow2,
  flow3,
}) => {
  const [active, setActive] = useState(true);
  return (
    <div className="flex flex-wrap items-center justify-between p-4 border-2 border-gray-200 rounded-md bg-white cursor-pointer gap-y-2 hover:shadow-md hover:scale-[1.02] duration-200">
      <div className="flex gap-x-4">
        <img
          className="aspect-square size-24 rounded-lg border-2 border-purple-200"
          src="
        https://www.diggers.com.au/cdn/shop/products/orange-cara-cara-navel-wcitcco_162cbf34-0cae-43ac-a538-847d0dc57335_2048x.jpg?v=1637122538
          "
          alt=""
        />
        <div className="flex flex-col gap-y-2">
          <p className="font-bold">{scheduleName}</p>
          <p>
            {startTime} - {stopTime}
          </p>
          <div className="flex">
            <div className="bg-red-200 p-1 rounded-s-lg">{flow1}ml</div>
            <div className="bg-blue-200 p-1">{flow2}ml</div>
            <div className="bg-yellow-200 p-1 rounded-e-lg">{flow3}ml</div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-8">
        <p className="font-medium">Every day</p>
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
            onChange={() => {
              setActive(!active);
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
