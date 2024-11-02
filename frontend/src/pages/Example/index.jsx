import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment } from "../../store/slices/counterSlice"

const Example = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("count change", count)
  }, [count])

  return (
    <>
      <div>Example</div>
      <div>{count}</div>
      <button
        onClick={() => {
          dispatch(increment())
        }}
        className="p-4 bg-red-200">increase</button>
    </>
  )
}

export default Example;