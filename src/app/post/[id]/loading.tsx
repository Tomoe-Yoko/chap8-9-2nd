"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center h-screen" aria-label="NowLoading...">
      <div className="animate-spin h-20 w-20 my-52 border-8 border-blue-300 rounded-full border-b-transparent"></div>
    </div>
  );
};

export default Loading;
