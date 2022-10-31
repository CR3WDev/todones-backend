const express = require("express");
const router = express.Router();
const task_service = require("../services/task.service");
const { isUUID } = require("../utils");

router.post("/task", async (req, res) => {
  const { title, content } = req.body;
  const task = {
    title,
    content,
  };
  try {
    const response = await task_service.save_task(task);
    return res.status(201).json({ task: response });
  } catch (err) {
    return res.status(400).json({
      error: "Você deve preencher todos os campos para cadastrar uma Task",
    });
  }
});
router.put("/task/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, completedAt } = req.body;
  const task_updated = {
    id,
    title,
    content,
    completedAt,
  };
  try {
    if (!isUUID(id)) {
      return res.status(400).json({ error: "id digitado inválido" });
    }
    const task = await task_service.get_task_by_id(id);
    if (!task)
      return res.status(400).json({
        error: "Task não encontrada",
      });
    const response = await task_service.update_task(task_updated);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(400).json({ error: "Body da requisição inválido" });
  }
});
router.get("/task/:id", async (req, res) => {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({
      error: "id deve ser um uuid",
    });
  }
  const response = await task_service.get_task_by_id(id);
  return res.status(200).json({ response });
});
router.get("/tasks", async (req, res) => {
  try {
    const response = await task_service.get_tasks();
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ error: "Ocorrou um erro na busca" });
  }
});
router.get("/tasks/completed", async (req, res) => {
  try {
    const response = await task_service.get_tasks_completed();
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Ocorrou um erro na busca" });
  }
});
router.get("/tasks/todo", async (req, res) => {
  try {
    const response = await task_service.get_tasks_todo();
    return res.status(200).json({ response });
  } catch (err) {
    return res.status(500).json({ error: "Ocorrou um erro na busca" });
  }
});
router.get("/tasks/delayed", async (req, res) => {
  try {
    const response = await task_service.get_tasks_delayed();
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
});
router.get("/tasks/completed/:date", async (req, res) => {
  const { date } = req.params;
  try {
    const response = await task_service.get_tasks_completed_by_date(date);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro no servidor" });
  }
});
router.delete("/task/:id", async (req, res) => {
  const { id } = req.params;
  if (!isUUID(id)) {
    return res.status(400).json({
      error: "id deve ser um uuid",
    });
  }
  const task = await task_service.get_task_by_id(id);
  if (!task)
    return res.status(400).json({
      error: "Task não encontrada",
    });
  const response = await task_service.delete_task_by_id(id);
  return res.status(200).json({ response });
});
router.delete("/tasks", async (req, res) => {
  try {
    const response = await task_service.delete_all_tasks();
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).json({ error: "Ocorreu um erro na busca" });
  }
});

module.exports = router;
