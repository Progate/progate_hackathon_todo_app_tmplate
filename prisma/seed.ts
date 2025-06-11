import {PrismaClient} from "@prisma/client";
import {tasks} from "./seed/tasks";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  await prisma.task.createMany({
    data: tasks,
    skipDuplicates: true,
  });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
