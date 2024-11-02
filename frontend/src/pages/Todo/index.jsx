import { useState } from "react";

const Todo = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  const addTask = () => {
    setTodoList(prev => [...prev, input]);
    setInput("");
  }

  const delTask = (id) => {
    const newTask = [...todoList];
    newTask.splice(id, 1);
    setTodoList(newTask);
  }

  return (
    <div className="flex flex-col p-2">
      <div className="flex">
        <input className="border-blue-500 border-2 rounded-lg" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTask} className="p-2 rounded-xl bg-blue-500 text-white">Add</button>
      </div>
      <div className="flex flex-col gap-y-2">
        {todoList.map((item, index) => 
          <div key={index}>
            {item}
            <button onClick={() => delTask(index)} className="p-2 rounded-lg bg-red-500 text-white">Del</button>
          </div>
        )}
      </div>
      <div className="h-36 bg-red-100 overflow-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, temporibus!
      </div>
    </div>
  )
}

export default Todo;