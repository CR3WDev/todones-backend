const Task = require("../models/task.model");
const { Op } = require("sequelize");

exports.get_tasks_todo = () => {
  return Task.findAll({
    where: {
      completed_at: {
        [Op.is]: null,
      },
    },
  });
};
exports.get_tasks_completed_by_date = (date) => {
  return Task.findAll({
    where: {
      completed_at: {
        [Op.lt]: new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000 - 1),
        [Op.gt]: new Date(date),
      },
    },
  });
};
exports.save_task = (task) => {
  const result = Task.create(task);
  return result;
};
exports.get_task_by_id = (id) => {
  return Task.findOne({
    where: {
      id,
    },
  });
};
exports.get_tasks = () => {
  return Task.findAll({
    order: [["createdAt", "DESC"]],
  });
};
exports.get_tasks_completed = () => {
  return Task.findAll({
    where: {
      completed_at: {
        [Op.not]: null,
      },
    },
    order: [["createdAt", "DESC"]],
  });
};
exports.get_tasks_delayed = () => {
  return Task.findAll({
    where: {
      completed_at: {
        [Op.is]: null,
      },
    },
    order: [["createdAt", "DESC"]],
  });
};
exports.update_task = (task) => {
  return Task.update(
    {
      title: task.title,
      completedAt: task.completedAt,
      content: task.content,
    },
    { where: { id: task.id } }
  );
};
exports.delete_all_tasks = () => {
  return Task.destroy({ truncate: true });
};
exports.delete_task_by_id = (id) => {
  return Task.destroy({
    where: {
      id,
    },
  });
};
