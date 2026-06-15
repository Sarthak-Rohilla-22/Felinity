import ErrorComp from "@/ui/ErrorComp";
import PageContainer from "@/ui/PageContainer";
import Spinner from "@/ui/Spinner";
import { fetchAllBreeds } from "@/utils/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router";

function Breeds() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("asc");

  const { data, status, error } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchAllBreeds,
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorComp error={error.message} />;

  const filteredBreeds = data.filter((breed) =>
    breed.name.toLowerCase().includes(search.toLowerCase()),
  );

  const sortedBreeds = [...filteredBreeds].sort((a, b) => {
    return sortBy === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name);
  });

  const PAGE_SIZE = 20;

  const paginatedBreeds = sortedBreeds.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  const totalPages = Math.ceil(sortedBreeds.length / PAGE_SIZE);

  const hasNextPage = page < totalPages - 1;

  return (
    <PageContainer
      heading="Cat Breeds"
      subHeading="Learn about the amazing cat empire!"
    >
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between -mt-7">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
          placeholder="Search breeds..."
          className="
            w-full md:max-w-sm
            rounded-md
            border border-taupe-300
            bg-white
            px-4 py-3
            outline-none
            focus:border-taupe-500
            focus:ring-2
            focus:ring-taupe-200
          "
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
            rounded-md
            border border-taupe-300
            bg-white
            px-4 py-3
            text-taupe-700
            outline-none
            focus:border-taupe-500
            focus:ring-2
            focus:ring-taupe-200
          "
        >
          <option value="asc">Name A - Z</option>
          <option value="desc">Name Z - A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedBreeds.map((cat) => (
          <div
            key={cat.id}
            className="
              overflow-hidden
              rounded-2xl
              border border-taupe-200
              bg-white
              shadow-sm
              transition-all
              hover:-translate-y-1
              hover:shadow-md
            "
          >
            {cat.image ? (
              <img
                src={cat.image?.url}
                alt={cat.name}
                className="h-64 w-full object-cover"
              />
            ) : (
              <div className="h-64 w-full flex items-center justify-center">
                <span className="text-xl mt-10">Image Not Available</span>
              </div>
            )}

            <div className="p-5">
              <h2 className="font-heading text-2xl text-taupe-800">
                {cat.name}
              </h2>

              <Link
                to={`/breeds/${cat.id}`}
                className="
                  mt-4 inline-block
                  rounded-md
                  bg-taupe-700
                  px-4 py-2
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-taupe-600
                "
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="
            rounded-md
            cursor-pointer
            border border-taupe-300
            px-5 py-2
            text-taupe-700
            transition
            hover:bg-taupe-50
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span className="font-medium text-taupe-700">Page: {page + 1}</span>

        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="
            cursor-pointer
            rounded-md
            bg-taupe-700
            px-5 py-2
            text-white
            transition
            hover:bg-taupe-600
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Next
        </button>
      </div>
    </PageContainer>
  );
}

export default Breeds;
