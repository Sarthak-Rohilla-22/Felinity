import { AuthContext } from "@/contexts/AuthContext";
import ErrorComp from "@/ui/ErrorComp";
import Spinner from "@/ui/Spinner";
import { fetchAllFavourites } from "@/utils/api";
import { supabase } from "@/utils/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";

function Favourites() {
  const { profile, user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { status, data, error } = useQuery({
    queryKey: ["favourites", profile?.id],
    queryFn: () => fetchAllFavourites(profile?.id),
    enabled: !!profile,
  });

  if (!user) {
    return (
      <div
        className="
          md:mx-auto
          mx-10
          max-w-2xl
          mt-70
          rounded-2xl
          border border-taupe-200
          bg-white
          p-10
          text-center
        "
      >
        <p className=" text-taupe-600 leading-relaxed text-2xl">
          Please Login to unlock this feature.
        </p>
      </div>
    );
  }

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorComp error={error.message} />;

  async function handleRemove(favId) {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("id", favId);

    if (error) {
      console.error(error);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["favourites", profile.id],
    });
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-6xl text-taupe-700 font-extrabold">
            My Favourites
          </h1>

          <p className="font-cute text-lg mt-4 text-taupe-600">
            Your collection of adorable cats.
          </p>
        </div>

        {data.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((fav) => (
              <div
                key={fav.id}
                className="
              relative
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
                <button
                  onClick={() => handleRemove(fav.id)}
                  className="
                absolute
                right-3
                top-3
                z-10
                rounded-full
                bg-white/90
                p-2
                text-red-500
                shadow-sm
                transition
                hover:bg-red-50
                hover:text-red-600
                cursor-pointer
              "
                >
                  <FaTrash />
                </button>

                <img
                  src={fav.imgUrl}
                  alt={fav.catId}
                  className="h-72 w-full object-cover"
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
          mx-auto
          max-w-2xl
          rounded-2xl
          border border-taupe-200
          bg-white
          p-10
          text-center
        "
          >
            <h2 className="font-heading text-3xl text-taupe-700">
              No Favourites Yet
            </h2>

            <p className="mt-4 text-taupe-600 leading-relaxed">
              Click the heart button in the image gallery to start building your
              collection of favourite cats.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favourites;
