"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";

import { Input } from "../input";
import { useDebounce } from "@/hooks/useDebounce.hook";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedQuery) {
      params.set("query", debouncedQuery);
    } else {
      params.delete("query");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [debouncedQuery, router]);

  return (
    <div className="relative w-fit max-w-md">
      <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-gray-800 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
    </div>
  );
};

export { Search };
