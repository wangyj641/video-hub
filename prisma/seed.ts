import { PrismaClient } from "@prisma/client";

import example from "./example.json";
// 初始化 Prisma Client
const prisma = new PrismaClient();

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });

// Insert data to tables: category, chapter and video
async function main() {
  await prisma.user.create({
    data: {
      id: "abc",
      name: "Bill Andmson",
      email: "bill@prisma.io",
    },
  });

  const category = await prisma.category.create({
    data: {
      name: "数学",
    },
  });

  const chapters = example.data.outlines.reduce((res: any[], item) => {
    item.lectures.forEach((lecture) => {
      res.push({
        title: lecture.title ?? lecture.en_title ?? "",
        cover: lecture.resource.cover_url,
        url: lecture.resource.content[0].url,
      });
    });

    return res;
  }, []);
  console.log(chapters);

  await prisma.video.create({
    data: {
      title: example.data.title,
      pic: example.data.cover_url,
      desc: example.data.brief,
      categoryId: category.id,
      authorId: "abc",
      chapter: {
        createMany: {
          data: chapters,
        },
      },
    },
  });
}
