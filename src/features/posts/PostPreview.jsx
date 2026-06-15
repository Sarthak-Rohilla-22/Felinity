import Button from "@/ui/Button";
import ImageCover from "@/ui/ImageCover";

function PostPreview({ id, title, content, coverImage }) {
  const previewText =
    content.length > 200 ? content.slice(0, 200) + "..." : content;

  return (
    <div className="group bg-white rounded-md overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {coverImage && (
        <div className="relative h-70 overflow-hidden">
          <ImageCover src={coverImage} alt={title} />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-heading text-2xl text-taupe-800 line-clamp-2 mb-3 leading-tight">
          {title}
        </h3>

        <p className="text-taupe-600 text-md leading-relaxed flex-1">
          {previewText}
        </p>

        <Button
          to={`/posts/${id}`}
          className="mt-6 inline-block w-full text-center"
        >
          Read Full Post
        </Button>
      </div>
    </div>
  );
}

export default PostPreview;
