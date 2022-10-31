import React from "react";
import DelIcom from "../assets/icon_cross.svg";
import axios from "axios";

export const Task = ({ task, set_tasks }) => {
  let is_task_completed = task.completedAt != null;
  const url = "http://localhost:4000";
  const handle_checkbox = (checked, task) => {
    task.completedAt = checked ? new Date().toISOString() : null;
    put_task_by_id(task);
  };
  const get_all_tasks = () => {
    axios.get(url + "/tasks").then((data) => {
      set_tasks(data.data.response);
    });
  };
  const put_task_by_id = async (task) => {
    axios.put(url + "/task/" + task.id, task).then((data) => {
      get_all_tasks();
    });
  };
  const delete_task_by_id = (id) => {
    axios.delete(url + "/task/" + id).then(() => {
      get_all_tasks();
    });
  };
  return (
    <div className="box">
      <div className="xx">
        <input
          type="checkbox"
          defaultChecked={is_task_completed}
          onChange={(e) => {
            handle_checkbox(e.target.checked, task);
            console.log(is_task_completed);
          }}
        ></input>
        <p className={is_task_completed ? "task_done" : ""}>{task.title}</p>
      </div>
      <button
        className="btn-del"
        onClick={() => {
          delete_task_by_id(task.id);
        }}
      >
        <img src={DelIcom} alt="" />
      </button>
    </div>
  );
};
