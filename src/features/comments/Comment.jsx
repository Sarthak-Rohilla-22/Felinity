import { AuthContext } from "@/contexts/AuthContext";
import { formatDate } from "@/utils/helpers";
import { supabase } from "@/utils/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

function Comment({ author, content, createdAt, postId, authorId }) {
  const queryClient = useQueryClient();
  const formattedDate = formatDate(createdAt);
  const { profile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(content);
  const [loading, setLoading] = useState(false);

  async function handleSaveChanges(e) {
    e.preventDefault();

    if (comment === content) {
      setIsEditing(false);
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("comments")
        .update({ content: comment })
        .eq("postId", postId)
        .eq("authorId", profile?.id);

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment? This action cannot be reversed.",
    );

    if (!isConfirmed) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from("comments")
        .delete()
        .eq("postId", postId)
        .eq("authorId", profile?.id);

      if (error) {
        throw error;
      }

      await queryClient.invalidateQueries({
        queryKey: ["posts", postId],
      });
    } catch (error) {
      console.error("Failed to delete comment:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h4 className="font-medium text-taupe-800">{author}</h4>

          {authorId === profile?.id && (
            <span
              className="
            rounded-full
            bg-taupe-100
            px-3
            py-1
            text-xs
            font-medium
            text-taupe-700
          "
            >
              Author
            </span>
          )}
        </div>

        <span className="text-sm text-taupe-500">{formattedDate}</span>
      </div>

      {isEditing ? (
        <div className="mt-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="
      w-full
      rounded-lg
      border border-taupe-300
      px-4 py-3
      text-taupe-700
      outline-none
      transition
      focus:border-taupe-500
      focus:ring-2
      focus:ring-taupe-200
    "
          />

          <div className="mt-3 flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="
        rounded-lg
        border border-taupe-300
        px-4 py-2
        text-sm
        font-medium
        text-taupe-700
        transition
        hover:bg-taupe-50
        cursor-pointer
      "
            >
              Cancel
            </button>

            <button
              onClick={handleSaveChanges}
              disabled={loading}
              className="
        rounded-lg
        bg-taupe-700
        px-4 py-2
        text-sm
        font-medium
        text-white
        transition
        hover:bg-taupe-600
        cursor-pointer
      "
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex items-start justify-between gap-4">
          <p className="flex-1 text-taupe-700 leading-relaxed">{content}</p>

          {authorId === profile?.id && (
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="
            rounded-md
            p-2
            text-taupe-600
            transition
            hover:bg-taupe-100
            hover:text-taupe-800
            cursor-pointer
          "
              >
                <FaEdit />
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="
            rounded-md
            p-2
            text-red-500
            transition
            hover:bg-red-50
            hover:text-red-600
            cursor-pointer
          "
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Comment;
