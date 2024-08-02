"use client";

import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Apiloading from "@/app/loading";
import Image from "next/image";

import { Post } from "@/app/_type/post";

const PostPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://mgbl6hrtar.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data: Post = await res.json();
      setPost(data);
    };
    fetcher();
  }, [id]);
  if (!post) {
    return (
      <div>
        {/* <Apiloading /> */}
        記事が見つかりません
      </div>
    );
  }

  return (
    <main>
      <Image
        src={post.thumbnail.url}
        alt={post.title}
        width={800}
        height={400}
      />
      <div>
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        <ul>
          {post.categories.map((category, index) => (
            <li key={index}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">{renderContent(post.content)}</div>
    </main>
  );
};

export default PostPage;

//renderContent////
//①タグ削除してテキストのみ抽出
const tagDelete = (p: string): string => {
  const tagP = document.createElement("p");
  //createElement(tagName, options)  //参考：　https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/innerText

  tagP.innerHTML = p;
  return tagP.textContent || tagP.innerText || "";
};

const renderContent = (content: string): string => {
  const shortText = tagDelete(content);
  return shortText;
};
