import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="py-4 px-12 bg-gray-900 text-white flex justify-between items-center w-full">
      <h1>
        <Link href="/">Blog</Link>
      </h1>
      <p>
        <Link href="contact">お問合せ</Link>
      </p>
    </header>
  );
};

export default Header;
