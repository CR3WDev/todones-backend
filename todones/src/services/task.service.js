const task_data = require("../database/task.data");

exports.save_task = (task) => {
  return task_data.save_task(task);
};
exports.get_task_by_id = (id) => {
  const task = task_data.get_task_by_id(id);
  if (!task) throw new Error("task not found");
  return task;
};
exports.delete_task_by_id = (id) => {
  return task_data.delete_task_by_id(id);
};
exports.get_tasks = () => {
  return task_data.get_tasks();
};
exports.get_tasks_completed = () => {
  return task_data.get_tasks_completed();
};
exports.get_tasks_todo = async () => {
  let tasks = await task_data.get_tasks_todo();
  const one_day = 60 * 60 * 24 * 1000;
  let tasks_todo = tasks.filter((task) => {
    task = task.dataValues;
    let { createdAt } = task;
    let now = new Date(Date.now());
    if (one_day >= now - createdAt) return task;
  });
  return tasks_todo;
};
exports.get_tasks_completed_by_date = async (date) => {
  let tasks = await task_data.get_tasks_completed_by_date(date);
  return tasks;
};
exports.get_tasks_delayed = async () => {
  const tasks = await task_data.get_tasks_delayed();
  const one_day = 60 * 60 * 24 * 1000;
  let tasks_delayed = tasks.filter((task) => {
    task = task.dataValues;
    let { createdAt } = task;
    let now = new Date(Date.now());
    if (one_day <= now - createdAt) return task;
  });
  return tasks_delayed;
};
exports.update_task = (task) => {
  console.log({ task });
  return task_data.update_task(task);
};
exports.delete_all_tasks = () => {
  return task_data.delete_all_tasks();
};
