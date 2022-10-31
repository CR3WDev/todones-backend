import React, { useEffect } from "react";
import axios from "axios";
import "./background.style.css";
import { useState } from "react";
const TodoBackground = ({ flag, set_flag }) => {
  const [input_title, set_input_title] = useState("");
  const url = "http://localhost:4000";
  const teste = async () => {
    const x = await axios.post(url + "/task", {
      title: input_title,
      content: "",
    });
    set_flag(flag + 1);
    return x;
  };
  return (
    <div className="background">
      <div className="background_content">
        <div className="d-flex justify-content-between pb-4">
          <h1>TODO</h1>
        </div>
        <div>
          <input
            className="input input_dark"
            placeholder="Create a new todo..."
            type="text"
            onChange={(e) => {
              set_input_title(e.target.value);
            }}
          />
          <button
            className="btn_add_task btn_dark"
            onClick={() => {
              teste();
            }}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoBackground;
