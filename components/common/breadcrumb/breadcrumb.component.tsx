"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <nav className="text-gray-600 text-sm mb-6">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const path = "/" + pathSegments.slice(0, index + 1).join("/");

          console.log("path", path);

          return (
            <li key={path} className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-white capitalize">{segment}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
