"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "assets");

  return (
    <nav className="text-gray-600 text-sm mb-6">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">
            <span className="font-bold">Home</span>
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");
          return (
            <li key={path} className="flex items-center font-bold space-x-2">
              <span>/</span>
              <span className="text-yellow-600 capitalize">
                {encodeURIComponent(segment)}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
