import ErrorComp from "@/ui/ErrorComp";
import Spinner from "@/ui/Spinner";
import { fetchAllPosts } from "@/utils/api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import PostPreview from "./PostPreview";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "@/contexts/AuthContext";
import PageContainer from "@/ui/PageContainer";
import Button from "@/ui/Button";

function Posts() {
  const { user } = useContext(AuthContext);
  const { status, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchAllPosts,
  });

  if (status === "pending") return <Spinner />;
  if (status === "error") return <ErrorComp error={error.message} />;

  return (
    <PageContainer
      heading="Community Hub"
      subHeading="Engage with a community of Ailurophiles!"
    >
      {user && (
        <div className="flex justify-end mb-8">
          <Button to="/createPost">
            <FaPlus />
            Create Post
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((post) => (
          <PostPreview
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </PageContainer>
  );
}

export default Posts;
