import React from "react";
import Link from "next/link";
import { SiConvertio } from "react-icons/si";

const Header = () => {
  return (
    <header className="w-full bg-yellow-500 flex justify-center items-center">
      <div className="h-15 py-6 px-4 flex justify-between items-center max-width w-full">
        <Link href="/">
          <span className="uppercase text-2xl font-bold text-white">
            Crypty
          </span>
        </Link>
        <Link href="/exchange">
          <div className="flex gap-2 items-center text-white">
            <SiConvertio />
            <span className="uppercase font-bold">Exchange</span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
