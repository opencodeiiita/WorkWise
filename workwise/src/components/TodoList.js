import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../utils/contexts/User.js";
import { Link, useNavigate } from "react-router-dom";

const TodoApp = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [newTaskContent, setNewTaskContent] = useState("");
  const { baseUrl } = useContext(UserContext);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCreateTask();
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Fetch all tasks
  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const response = await axios.get(`${baseUrl}/todoList`, {
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
					},
				});

        setTasks(response.data.toDoList.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAllTasks();
  }, []);

  // Create a new task
  const handleCreateTask = async () => {
    try {
      const response = await axios.post(
				`${baseUrl}/todoList`,
				{
					content: newTaskContent,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
					},
				}
			);

      const updatedToDoList = response.data.toDoList;
      setTasks(updatedToDoList.tasks);
      setNewTaskContent("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  //update status of task

  const handleTaskStatusUpdate = async (taskId, status) => {
    try {
      await axios.put(
				`${baseUrl}/todoList`,
				{
					status: status,
					taskId: taskId,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
					},
				}
			);

      const updatedTasks = tasks.map((task) => {
        if (task._id === taskId) {
          return {
            ...task,
            status: status,
          };
        }
        return task;
      });

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  //delete task

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/todoList/${taskId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      });

      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-4 w-1/4  max-h-96 right-4 z-10 bg-white bg-opacity-90 p-4 shadow-lg rounded-lg">
          <button
            type="button"
            className="absolute top-2 right-2 text-gray-600 hover:text-red-700"
            onClick={handleClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-semibold text-black mb-6">TO DO LIST</h1>
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="What needs to be done today?"
              className="w-full px-4 py-3 border rounded outline-none border-gray-600"
              value={newTaskContent}
              onChange={(e) => setNewTaskContent(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <ul className="list-none">
            {tasks &&
              tasks.length !== 0 &&
              tasks.map((task) => (
                <li
                  key={task._id}
                  className={`flex items-center justify-between py-2 border-b border-gray-300 ${
                    task.status === "completed"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={task.status === "completed"}
                      onChange={() =>
                        handleTaskStatusUpdate(
                          task._id,
                          task.status === "completed"
                            ? "incomplete"
                            : "completed"
                        )
                      }
                    />
                    <p className="text-gray-600">{task.content}</p>
                  </div>

                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 text-red-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TodoApp;
