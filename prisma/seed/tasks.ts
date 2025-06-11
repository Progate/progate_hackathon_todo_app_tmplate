import {Task} from "@prisma/client";

const oneMonthLater = new Date();
oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

const oneMonthBefore = new Date();
oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);

export const tasks: Task[] = [
  {
    id: 1,
    title: "Task1",
    isDone: false,
    dueDate: oneMonthLater,
    description: "description1",
    createdAt: new Date(2020, 0, 4),
    updatedAt: new Date(2020, 0, 4),
  },
  {
    id: 2,
    title: "Task2",
    isDone: false,
    dueDate: oneMonthBefore,
    description: "description2",
    createdAt: new Date(2020, 0, 4),
    updatedAt: new Date(2020, 0, 4),
  },
  {
    id: 3,
    title: "Task3",
    isDone: false,
    dueDate: new Date(),
    description: "description3",
    createdAt: new Date(2020, 0, 4),
    updatedAt: new Date(2020, 0, 4),
  },
  {
    id: 4,
    title: "Task4",
    isDone: true,
    dueDate: oneMonthLater,
    description: "description1",
    createdAt: new Date(2020, 0, 4),
    updatedAt: new Date(2020, 0, 4),
  },
];
