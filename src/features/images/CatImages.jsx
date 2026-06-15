import Spinner from "@/ui/Spinner";
import { fetAllCatsImages, fetchAllFavourites } from "@/utils/api";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import CatImage from "./CatImage";
import ErrorComp from "@/ui/ErrorComp";
import { AuthContext } from "@/contexts/AuthContext";
import PageContainer from "@/ui/PageContainer";

function CatImages() {
  const {
    status,
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["catImages"],
    queryFn: fetAllCatsImages,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 20) {
        return undefined;
      }
      return pages.length;
    },
  });

  const { profile } = useContext(AuthContext);

  const { data: favourites = [] } = useQuery({
    queryKey: ["favourites", profile?.id],
    queryFn: () => fetchAllFavourites(profile.id),
    enabled: !!profile,
  });

  if (status === "pending") {
    return <Spinner />;
  }

  if (status === "error") {
    return <ErrorComp error={error.message} />;
  }

  return (
    <PageContainer
      heading="Discover Cats"
      subHeading="Cute cats to increase your serotonin level"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6">
          {data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((cat) => (
                <CatImage
                  key={cat.id}
                  imgUrl={cat.url}
                  id={cat.id}
                  favourites={favourites}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
      <button
        onClick={() => fetchNextPage()}
        className="mx-auto block rounded-md bg-taupe-800 px-8 py-3 font-cute text-lg font-medium tracking-wide text-stone-100 transition-all duration-200 hover:bg-taupe-700 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer mt-10"
        disabled={!hasNextPage || isFetching}
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
      </button>
    </PageContainer>
  );
}

export default CatImages;
