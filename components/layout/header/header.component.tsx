import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-gray-800 flex justify-center items-center text-white">
      <div className="h-14 py-6 px-5 lg:px-0 flex items-center max-width w-full">
        <Link href="/">
          <span className="uppercase font-bold">Crypty</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
