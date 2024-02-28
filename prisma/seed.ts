import { PrismaClient } from "@prisma/client";
// 初始化 Prisma Client
const prisma = new PrismaClient();

async function main() {
  //在此编写 Prisma Client 查询
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });
