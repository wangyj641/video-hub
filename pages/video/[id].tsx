import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { makeSerializable } from "../../lib/util";
import { Video, User } from "@prisma/client";

type Props = {
  data: (Video & {
    author: User;
  })[];
};

export default function Page({ data }: Props) {
  console.log(data);
  return (
    <div className="max-w-3xl mx-auto">
      <header className="flex justify-between items-center p-3 bg-white shadow">
        <h1 className="font-bold text-2xl">Video Hub</h1>
      </header>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await prisma.video.findUnique({
    include: {
      chapter: true,
      author: true,
    },
    where: {
      id: Number(context.params.id),
    },
  });

  return {
    props: { data: makeSerializable(data) },
  };
};
