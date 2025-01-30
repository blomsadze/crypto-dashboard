import React from "react";

const Loading = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-16 h-16 rounded-full animate-spin border-y-2 border-solid border-violet-500 border-t-transparent shadow-md" />
    </div>
  );
};

export default Loading;
