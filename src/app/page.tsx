"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Post } from "./_type/post";

export default function Home() {
  const [post, setPost] = useState<Post[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(
        "https://mgbl6hrtar.microcms.io/api/v1/posts",
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const { contents } = await response.json();
      setPost(contents);
    };
    fetcher();
  }, []);
  return (
    <main className="pt-14 w-full">
      <section>
        <h1>記事一覧ページ</h1>
      </section>
      <ul>
        {post.map(({ id, createdAt, categories, title, content }) => (
          <li key={id}>
            <Link href={`/post/${id}`}>
              <div>
                <p>{new Date(createdAt).toLocaleDateString()}</p>
                <div>
                  {categories.map((category, index) => (
                    <div key={index}>{category.name}</div>
                  ))}
                </div>
              </div>
              <h2>{title}</h2>
              <div>{renderContent(content)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

//renderContent////
//①タグ削除してテキストのみ抽出
const tagDelete = (p: string): string => {
  const tagP = document.createElement("p");
  //createElement(tagName, options)
  tagP.innerHTML = p;
  return tagP.textContent || tagP.innerText || "";
  //参考：　https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/innerText
};
const truncateText = (text: string): string => {
  if (text.length >= 25) {
    return text.slice(0, 24) + "...";
  } else {
    return text;
  }
};
const renderContent = (content: string): string => {
  const shortText = tagDelete(content);
  const truncateContent = truncateText(shortText);
  return truncateContent;
};
