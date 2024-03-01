import React, { useRef, useEffect } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
//import Image from "next/image";
import prisma from "@/lib/prisma";
import { makeSerializable } from "@/lib/util";
import { Video, User, Chapter } from "@prisma/client";
import useSWRInfinite from "swr/infinite";
import useOnScreen from "@/hooks/useOnScreen";

const img1 = 'https://www.rd.com/wp-content/uploads/2020/02/GettyImages-187514202-1.jpg'

type Props = {
  video: Video & {
    author: User;
  };
};

type Result = { data: Chapter[]; nextCursor: number };

const getKey = (pageIndex, previousPageData, videoId) => {
  // reached the end
  if (previousPageData && !previousPageData.data) return null;

  // First page has no previousPageData
  if (pageIndex === 0) return `/api/chapter?videoId=${videoId}`;

  // Add cursor to API
  return `/api/chapter?cursor=${previousPageData.nextCursor}&videoId=${videoId}`;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page({ video }: Props) {
  // To monitor whether the Div element is shown or not
  const ref: any = useRef<HTMLDivElement>();
  const onScreen: boolean = useOnScreen<HTMLDivElement>(ref);

  const { data, error, size, setSize } = useSWRInfinite<Result>(
    (...args) => getKey(...args, video.id),
    fetcher,
    {
      revalidateFirstPage: false,
    }
  );

  const hasNext = data && data[data.length - 1].nextCursor;
  const isLoadingInitialData = !data && !error;

  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  useEffect(() => {
    if (onScreen && hasNext) {
      setSize(size + 1);
    }
  }, [onScreen, hasNext]);

  return (
    <div className="max-w-5xl px-3 mx-auto pb-5">
      <h1 className="text-3xl my-4 text-center">{video.title}</h1>
      <div className="text-center">
        <img src={img1} width={320} height={180} alt={video.title} />
      </div>
      <div className="p-3">{video.desc}</div>
      <h2 className="text-xl my-2">Chapter videos</h2>
      <div>
        <main className="grid min-h-screen grid-cols-2 md:grid-cols-4 gap-4 md:gap-4">
          {data &&
            data.map((pageData, index) => {
              // `data` API response array
              return pageData.data.map((item) => (
                <div
                  className="ring-1 ring-gray-200 p-2 flex flex-col justify-center"
                  key={item.id}
                >
                  <Link href={`/video/chapter/${item.id}`} legacyBehavior>
                    <a className="mx-auto">
                      <img
                        className="aspect-video"
                        src={img1}
                        width={160}
                        height={90}
                        alt={item.title}
                      />
                      <div className="mt-2 h-12 text-ellipsis overflow-hidden">
                        {item.title}
                      </div>
                    </a>
                  </Link>
                </div>
              ));
            })}
        </main>
        <div className="text-center p-3" ref={ref}>
          {isLoadingMore ? "Loading..." : hasNext ? "Load more" : "No data"}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const video = await prisma.video.findUnique({
    include: {
      author: true,
    },
    where: {
      id: Number(context.params.id),
    },
  });

  return {
    props: {
      video: makeSerializable(video),
    },
  };
};
