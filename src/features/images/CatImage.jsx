import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function CatImage({ id, imgUrl, favourites }) {
  const { profile, user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const isFavourite = favourites.some((fav) => fav.catId === id);

  async function handleFavourite() {
    if (!user) {
      toast.error("Please Login to unlock this feature.");
      return;
    }

    const { data: fav, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("userId", profile?.id)
      .eq("catId", id);

    if (error) {
      console.error(error);
    }

    if (fav.length === 0) {
      const { error } = await supabase
        .from("favourites")
        .insert([{ catId: id, imgUrl: imgUrl, userId: profile.id }])
        .select();

      if (error) {
        console.error(error);
      }

      await queryClient.invalidateQueries({
        queryKey: ["favourites", profile.id],
      });
    } else {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("userId", profile?.id)
        .eq("catId", id);

      if (error) {
        console.error(error);
      }

      await queryClient.invalidateQueries({
        queryKey: ["favourites", profile.id],
      });
    }

    if (error) {
      console.error(error);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl bg-taupe-100 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={imgUrl}
          alt={`Cat ${id}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div
        className="absolute top-3 right-3 flex flex-col gap-2.5 
                      opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 z-10"
      >
        <button
          onClick={handleFavourite}
          className="cursor-pointer w-10 h-10 bg-[#FAF7F0]  rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md active:scale-95 transition-all "
        >
          {isFavourite ? (
            <FaHeart className="text-taupe-600 text-2xl" />
          ) : (
            <FaRegHeart className="text-taupe-600 text-2xl" />
          )}
        </button>
      </div>
    </div>
  );
}

export default CatImage;
