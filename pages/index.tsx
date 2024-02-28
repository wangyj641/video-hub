import React from "react";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";
import { makeSerializable } from "../lib/util";
import { Video, User } from "@prisma/client";

type Props = {
  data: (Video & {
    author: User;
  })[];
};

export default function Page({ data }: Props) {
  console.log(data);
  return (
    <div className="max-w-5xl px-3 mx-auto">
      <h1>首页gg</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.video.findMany({
    include: { author: true },
  });

  return {
    props: { data: makeSerializable(data) },
  };
};
