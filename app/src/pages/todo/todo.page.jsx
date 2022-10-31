import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TodoBackground from "./background/background.component";
import TrashIcon from "../../assets/icon_trash.svg";
import axios from "axios";
import "./todo.style.css";
import { Task } from "../../components/task.component";

const TodoPage = () => {
  const url = "http://localhost:4000";
  const [tasks, set_tasks] = useState([]);
  const [flag, set_flag] = useState(0);

  const delete_all_tasks = () => {
    axios.delete(url + "/tasks").then(() => {
      get_all_tasks();
    });
  };
  const get_all_tasks = () => {
    axios.get(url + "/tasks").then((data) => {
      set_tasks(data.data.response);
    });
  };
  const put_task_by_id = async (task) => {
    axios.put(url + "/task/" + task.id, task).then((data) => {
      console.log(data);
      get_all_tasks();
    });
  };
  useEffect(() => {
    get_all_tasks();
  }, [flag]);
  return (
    <div>
      <TodoBackground flag={flag} set_flag={set_flag}></TodoBackground>
      <div className="content-box">
        <div className="content">
          {tasks.map((task, index) => {
            return <Task key={index} task={task} set_tasks={set_tasks}></Task>;
          })}
        </div>
        <div className="clear_all">
          <button
            onClick={() => {
              delete_all_tasks();
            }}
          >
            <img src={TrashIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
