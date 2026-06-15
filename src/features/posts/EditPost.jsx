import { AuthContext } from "@/contexts/AuthContext";
import Input from "@/ui/Input";
import PageContainer from "@/ui/PageContainer";
import { supabase } from "@/utils/supabase";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

function EditPost() {
  const { postId } = useParams();
  const numPostId = Number(postId);
  const [title, setTitle] = useState("");
  const [newCoverImage, setNewCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [existingCoverImage, setExistingCoverImage] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setNewCoverImage(e.target.files[0]);
    }
  }

  async function handleEditPost(e) {
    e.preventDefault();
    if (!title || !content) return;
    setLoading(true);

    try {
      let imageUrl = existingCoverImage;

      if (newCoverImage) {
        const fileExt = newCoverImage.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        const { error: imageUploadError } = await supabase.storage
          .from("coverImages")
          .upload(filePath, newCoverImage);

        if (imageUploadError) {
          console.error("Upload error:", imageUploadError);
          return;
        }

        const { data: imageData } = supabase.storage
          .from("coverImages")
          .getPublicUrl(filePath);

        imageUrl = imageData.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("posts")
        .update({
          title: title,
          content: content,
          coverImage: imageUrl,
        })
        .eq("id", numPostId);

      if (updateError) {
        console.error("Update error:", updateError);
        return;
      }
      navigate(`/posts`);
      toast.success("Post Successfully Edited!");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Some Error Occured!");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post? This action cannot be reversed",
    );
    if (!isConfirmed) return;
    setLoading(true);

    try {
      await supabase.from("likes").delete().eq("postId", postId);
      await supabase.from("comments").delete().eq("postId", postId);

      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", numPostId);
      if (error) {
        console.error(error);
        return;
      }
      navigate("/posts");
      toast.success("Post successfully Deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Some Error Occured!");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function getPostData() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", numPostId)
          .single();

        if (error) throw error;

        setTitle(data.title);
        setExistingCoverImage(data.coverImage);
        setContent(data.content);
      } catch (err) {
        console.error(err);
      }
    }
    getPostData();
  }, [numPostId]);

  return (
    <PageContainer heading="Edit Post" subHeading="Make changes to your post.">
      <form className="mt-8 space-y-6" onSubmit={handleEditPost}>
        <div>
          <label className="block mb-2 text-sm font-medium text-taupe-700">
            Title
          </label>

          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-taupe-500">
            Replace Cover Image (optional)
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="
                w-full
                rounded-lg
                border border-taupe-300
                px-4 py-3
                text-taupe-700
                file:mr-4
                file:rounded-lg
                file:border-0
                file:bg-taupe-700
                file:px-4
                file:py-2
                file:text-white
                file:font-medium
                file:cursor-pointer
                cursor-pointer
              "
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-taupe-700">
            Content
          </label>

          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="
                w-full
                rounded-lg
                border border-taupe-300
                px-4 py-3
                outline-none
                resize-none
                transition
                focus:border-taupe-500
                focus:ring-2
                focus:ring-taupe-200
              "
            required
          />
        </div>

        <div className="flex justify-between pt-2">
          <button
            onClick={handleDelete}
            textColor="red-600"
            hoverColor="red-100"
            bgColor="red-50"
            type="button"
            className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-6 py-3
                font-medium
                text-red-600
                transition
                hover:bg-red-100
                cursor-pointer
              "
          >
            Delete Post
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(`/posts`)}
              className="
                  rounded-lg
                  border border-taupe-300
                  px-6 py-3
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
              type="submit"
              className="
                  rounded-lg
                  bg-taupe-700
                  px-6 py-3
                  font-medium
                  text-white
                  transition
                  hover:bg-taupe-600
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  cursor-pointer
                "
              disabled={loading}
            >
              Update Post
            </button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default EditPost;
