import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "@/models/task";
import {body, validationResult} from "express-validator";
import {formatDate} from "@/lib/util";

export const router = express.Router();

router.get("/", async (req, res) => {
  const tasks = await getTasks();
  const now = new Date();
  const convertedTasks = tasks.map(task => {
    const dueDate = task.dueDate;
    let priority;
    if (
      dueDate.getFullYear() === now.getFullYear() &&
      dueDate.getMonth() === now.getMonth() &&
      dueDate.getDate() === now.getDate()
    ) {
      priority = "Normal";
    } else if (now < dueDate) {
      priority = "Low";
    } else {
      priority = "High";
    }
    return {
      ...task,
      dueDate: formatDate(task.dueDate),
      status: task.isDone ? "DONE" : "TODO",
      priority,
    };
  });
  res.render("tasks/index", {tasks: convertedTasks});
});

router.get("/tasks/new", (req, res) => {
  res.render("tasks/new", {
    task: {},
  });
});

router.get("/tasks/:id", async (req, res) => {
  const {id} = req.params;
  const task = await getTask(Number(id));
  res.render("tasks/show", {
    task: {...task, dueDate: formatDate(task.dueDate)},
  });
});

router.post(
  "/tasks",
  body("title").notEmpty().withMessage("Title is required"),
  body("dueDate")
    .notEmpty()
    .withMessage("DueDate is required")
    .isDate({format: "YYYY-MM-DD"})
    .withMessage("DueDate must be a valid date in YYYY-MM-DD format"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("tasks/new", {
        task: req.body,
        errors: errors.array(),
      });
    }

    const {title, dueDate, description} = req.body;
    await createTask({title, dueDate: new Date(dueDate), description});
    res.redirect("/");
  },
);

router.get("/tasks/:id/edit", async (req, res) => {
  const {id} = req.params;
  const task = await getTask(Number(id));
  res.render("tasks/edit", {
    task: {...task, dueDate: formatDate(task.dueDate)},
  });
});

router.patch(
  "/tasks/:id",
  body("title").notEmpty().withMessage("Title is required"),
  body("dueDate")
    .notEmpty()
    .withMessage("DueDate is required")
    .isDate({format: "YYYY-MM-DD"})
    .withMessage("DueDate must be a valid date in YYYY-MM-DD format"),
  async (req: express.Request<{id: string}>, res) => {
    const {id} = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("tasks/edit", {
        task: {id, ...req.body},
        errors: errors.array(),
      });
    }

    const {isDone, title, dueDate, description} = req.body;
    await updateTask(Number(id), {
      isDone: isDone === "true",
      title,
      dueDate: new Date(dueDate),
      description,
    });
    res.redirect("/");
  },
);

router.delete("/tasks/:id", async (req, res) => {
  const {id} = req.params;
  await deleteTask(Number(id));
  res.redirect("/");
});
