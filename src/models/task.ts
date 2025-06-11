import {databaseManager} from "@/db";
import {Prisma} from "@prisma/client";

export const getTasks = async () => {
  const prisma = databaseManager.getInstance();
  return await prisma.task.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const getTask = async (id: number) => {
  const prisma = databaseManager.getInstance();
  return await prisma.task.findUniqueOrThrow({
    where: {
      id,
    },
  });
};

export const createTask = async (data: Prisma.TaskCreateInput) => {
  const prisma = databaseManager.getInstance();
  return await prisma.task.create({
    data,
  });
};

export const updateTask = async (id: number, data: Prisma.TaskUpdateInput) => {
  const prisma = databaseManager.getInstance();
  return await prisma.task.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteTask = async (id: number) => {
  const prisma = databaseManager.getInstance();
  return await prisma.task.delete({
    where: {
      id,
    },
  });
};
