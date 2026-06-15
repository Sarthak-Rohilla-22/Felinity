import { AuthContext } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

function AddComment({ postId }) {
  const { profile, user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  async function handleAddComment(e) {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to comment!");
      return;
    }

    if (!comment.trim()) return;
    setLoading(true);

    try {
      const { error } = await supabase.from("comments").insert([
        {
          postId,
          authorId: profile.id,
          content: comment,
        },
      ]);

      if (error) {
        throw error;
      }

      setComment("");

      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 flex w-full">
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="
          flex-1
          border border-taupe-300
          bg-white
          px-4 py-3
          font-cute
          text-taupe-700
          outline-none
          transition-all
          focus:border-taupe-500
          focus:ring-2
          focus:ring-taupe-200
        "
      />

      <button
        onClick={handleAddComment}
        diabled={loading}
        className="
          bg-taupe-700
          px-6 py-3
          font-cute
          font-medium
          text-white
          transition-all
          hover:bg-taupe-600
          cursor-pointer
        "
      >
        Post
      </button>
    </div>
  );
}

export default AddComment;
