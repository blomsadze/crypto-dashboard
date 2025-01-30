import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center rounded-xl bg-white lg:w-[25rem] w-full p-8 shadow-lg">
        <FaExclamationTriangle className="h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-4xl font-bold text-gray-800">404</h1>
        <p className="mt-2 text-lg text-gray-600">Page Not Found</p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-yellow-500 px-4 py-2 text-white hover:opacity-80"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
