import Spinner from "@/ui/Spinner";
import { fetchPostById } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router";
import GoBack from "@/ui/GoBack";
import Likes from "../likes/Likes";
import AddComment from "../comments/AddComment";
import Comments from "../comments/Comments";
import { formatDate } from "@/utils/helpers";
import { AuthContext } from "@/contexts/AuthContext";
import ErrorComp from "@/ui/ErrorComp";
import { FaEdit } from "react-icons/fa";
import Button from "@/ui/Button";

function Post() {
  const { id } = useParams();
  const { profile } = useContext(AuthContext);
  const postId = Number(id);

  const {
    status,
    data: post,
    error,
  } = useQuery({
    queryKey: ["posts", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorComp error={error.message} />;

  const { coverImage, title, content, createdAt, authorId, likes } = post;
  const likesCount = likes.length;

  const isAuthor = authorId === profile?.id;

  const formattedDate = formatDate(createdAt);

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <main className="max-w-3xl mx-auto px-6 py-5">
        <div className="flex justify-between">
          <GoBack />
          {isAuthor && (
            <Button to={`/edit/${postId}`} className="self-end rounded mb-4">
              <FaEdit className="mt-[3.5px] mr-2" />
              Edit Post
            </Button>
          )}
        </div>
        <h1 className="font-heading text-4xl md:text-5xl leading-tight text-taupe-700 font-semibold text-center">
          {title}
        </h1>

        <div className="flex justify-between">
          <div className="mt-6 flex items-center gap-2 text-md text-taupe-500">
            <span>By {post.author.name}</span>
            <span>·</span>
            <span>{formattedDate}</span>
          </div>
          <Likes likes={likesCount} postId={postId} likesObj={likes} />
        </div>

        <img
          src={coverImage}
          alt={title}
          className="w-full mt-5 h-96 object-cover rounded-md"
        />

        <article className="mt-12 prose prose-lg max-w-full overflow-x-hidden">
          {content}
        </article>
        <AddComment postId={postId} />
        <Comments comments={post.comments} postId={postId} />
      </main>
    </div>
  );
}

export default Post;
