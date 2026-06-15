import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Likes({ likes, postId, likesObj }) {
  const { profile, user } = useContext(AuthContext);
  const userLike = likesObj.find((like) => like.userId === profile?.id) || null;
  const queryClient = useQueryClient();

  async function handleLike() {
    if (!user) {
      toast.error("Please login to like!");
      return;
    }

    if (!userLike) {
      const { error } = await supabase
        .from("likes")
        .insert([{ postId: postId, userId: profile.id }])
        .select();

      if (error) {
        console.error(error);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });
    }

    if (userLike) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("userId", profile.id)
        .eq("postId", postId);

      if (error) {
        console.error(error);
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });
    }
  }

  return (
    <div className="flex">
      <button onClick={handleLike}>
        {userLike ? (
          <FaHeart className="text-taupe-600  text-xl mt-6.5 mr-2 cursor-pointer " />
        ) : (
          <FaRegHeart className="text-taupe-600  text-xl mt-6.5 mr-2 cursor-pointer " />
        )}
      </button>
      <p className="mt-6 flex items-center gap-2 text-md text-taupe-500">
        Likes: {likes}
      </p>
    </div>
  );
}

export default Likes;
