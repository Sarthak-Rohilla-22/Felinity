import React from "react";
import Comment from "./Comment";

function Comments({ comments, postId }) {
  return (
    <div className="mt-10 divide-y divide-taupe-200">
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.author.name}
          authorId={comment.author.id}
          content={comment.content}
          createdAt={comment.createdAt}
          postId={postId}
        />
      ))}
    </div>
  );
}

export default Comments;
