import React, { FC } from "react";

type TProps = {
  title: string;
};

const PageTitle: FC<TProps> = ({ title }) => {
  return (
    <h2 className="lg:text-4xl border-b-2 pb-1 border-yellow-300 w-fit text-xl font-bold mb-4">
      {title}
    </h2>
  );
};

export { PageTitle };
