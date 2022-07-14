import React, { useState } from "react";
import InputBox from "./InputBox";
import { CommentActionButtonWrapper, CommentAuthor, CommentContent, CommentHeader, CommentWrapper } from "./style";

function Comment({ data, getReplies1, onReplyClick, likeComment }) {
  const { id: dataId, content, Author, createdAt, likes } = data;
  const [showInput, setShowInput] = useState(false);

  const onPostReply = (content) => {
    console.log(dataId, content);
    setShowInput(false);
    onReplyClick(dataId, content);
  };

  return (
    <CommentWrapper>
      <CommentHeader>
        <div>
          <CommentAuthor>{Author}</CommentAuthor>
          <CommentContent>{content}</CommentContent>
        </div>
        <div>{new Date(createdAt).toDateString()}</div>
      </CommentHeader>
      <CommentActionButtonWrapper>
        <button onClick={() => likeComment(dataId)}>Like</button>
        {likes > 0 && <p className="likes">{likes}</p>}
        <button onClick={() => setShowInput((prev) => !prev)}>Reply</button>
      </CommentActionButtonWrapper>
      {showInput && <InputBox onPostReply={onPostReply} />}
      {getReplies1(dataId)?.map((reply) => (
        <Comment
          key={reply.id}
          data={reply}
          onReplyClick={onReplyClick}
          getReplies1={getReplies1}
          likeComment={likeComment}
        />
      ))}
    </CommentWrapper>
  );
}

export default Comment;
