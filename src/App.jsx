import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function App() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("task"));

    if (savedTasks) {
      setTask(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (task.length > 0) {
      localStorage.setItem("task", JSON.stringify(task));
    }
  }, [task]);

  const getTask = (e) => {
    setInputValue(e.target.value);
  };
  const AddTodo = () => {
    if (inputValue.trim()) {
      // Check if input is not empty
      setTask([...task, inputValue]); // Add the input value to the array
      setInputValue(""); // Clear the input field
    }
  };

  const deleteTodo = (index) => {
    const updatedTasks = task.filter((_, taskIndex) => taskIndex !== index);
    setTask(updatedTasks);
  };

  return (
    <div className="w-[24rem] bg-white p-5">
      <h1 className="text-2xl font-bold border-b-2 border-black pb-3 text-center">
        To-Do-App
      </h1>

      <div className="flex items-center justify-between my-10">
        <input
          type="text"
          placeholder="Add your new todo"
          value={inputValue}
          className="border border-black px-4 py-1 w-full h-full mr-2 rounded"
          onChange={getTask}
        />
        <button
          className="bg-blue-600 px-4 py-[5px] text-white h-full rounded-md  active:bg-blue-500 cursor-pointer transition duration-800 ease-in-out"
          onClick={AddTodo}
        >
          ADD
        </button>
      </div>

      <ul>
        {task.map((item, index) => (
          <div className="group">
            <li
              key={index}
              className="flex items-center justify-between px-4 py-2 my-1 border-2 border-black hover:bg-gray-300"
            >
              {item}

              <FaRegTrashAlt
                className=" opacity-0 group-hover:opacity-100"
                onClick={() => {
                  deleteTodo(index);
                }}
              />
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;

