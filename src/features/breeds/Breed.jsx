import ErrorComp from "@/ui/ErrorComp";
import Spinner from "@/ui/Spinner";
import { fetchBreedById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";

function Breed() {
  const { id } = useParams();

  const { data, status, error } = useQuery({
    queryKey: ["breed", id],
    queryFn: () => fetchBreedById(id),
    enabled: !!id,
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorComp error={error.message} />;

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-taupe-200 shadow-sm overflow-hidden">
          {data.image ? (
            <img
              src={data.image.url}
              alt={data.name}
              className="w-full h-80 md:h-96 object-cover"
            />
          ) : (
            <div className="h-80 flex items-center justify-center bg-taupe-100 text-taupe-500">
              No Image Found
            </div>
          )}

          <div className="p-8">
            <h1 className="font-heading text-4xl md:text-5xl text-taupe-800 font-bold">
              {data.name}
            </h1>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl bg-taupe-50 p-4">
                <p className="text-sm text-taupe-500">Origin</p>
                <p className="font-medium text-taupe-800">{data.origin}</p>
              </div>

              <div className="rounded-xl bg-taupe-50 p-4">
                <p className="text-sm text-taupe-500">Life Span</p>
                <p className="font-medium text-taupe-800">
                  {data.life_span} years
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-heading text-2xl text-taupe-800 mb-3">
                Description
              </h2>

              <p className="text-taupe-700 leading-8">{data.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="font-heading text-2xl text-taupe-800 mb-3">
                Temperament
              </h2>

              <div className="flex flex-wrap gap-2">
                {data.temperament.split(", ").map((trait) => (
                  <span
                    key={trait}
                    className="
                  rounded-full
                  bg-taupe-100
                  px-4 py-2
                  text-sm
                  text-taupe-700
                "
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            <a
              href={data.wikipedia_url}
              target="_blank"
              rel="noopener noreferrer"
              className="
            mt-10
            inline-block
            rounded-lg
            bg-taupe-700
            px-6 py-3
            font-medium
            text-white
            transition
            hover:bg-taupe-600
          "
            >
              View on Wikipedia
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breed;
