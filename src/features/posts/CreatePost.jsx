import { AuthContext } from "@/contexts/AuthContext";
import Input from "@/ui/Input";
import PageContainer from "@/ui/PageContainer";
import { supabase } from "@/utils/supabase";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

function CreatePost() {
  const { user, profile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0]);
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault();

    if (!title || !content || !coverImage) return;

    setLoading(true);

    try {
      const filePath = `${user.id}/${crypto.randomUUID()}.jpg`;

      const { error: imageUploadError } = await supabase.storage
        .from("coverImages")
        .upload(filePath, coverImage);

      if (imageUploadError) {
        throw imageUploadError;
      }

      const { data: imageData } = supabase.storage
        .from("coverImages")
        .getPublicUrl(filePath);

      const imageUrl = imageData.publicUrl;

      const { error: postError } = await supabase.from("posts").insert([
        {
          title,
          content,
          coverImage: imageUrl,
          authorId: profile.id,
        },
      ]);

      if (postError) {
        throw postError;
      }

      navigate("/posts");
      toast.success("Post Successfully Created!");
    } catch (error) {
      console.error("Failed to create post:", error);
      toast.error("Some error occured!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer
      heading="Create Post"
      subHeading="Share something with the community"
    >
      <form className="mt-8 space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-taupe-700">
            Title
          </label>

          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-taupe-700">
            Cover Image
          </label>

          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
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
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => navigate("/posts")}
            type="button"
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
            onClick={handleCreatePost}
            disabled={loading}
            type="submit"
            className="
                rounded-lg
                bg-taupe-700
                px-6 py-3
                font-medium
                text-white
                transition
                hover:bg-taupe-600
                cursor-pointer
              "
          >
            Publish Post
          </button>
        </div>
      </form>
    </PageContainer>
  );
}

export default CreatePost;
