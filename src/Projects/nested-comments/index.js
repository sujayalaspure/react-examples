import React, { useEffect, useState } from "react";
import Footer from "../../Components/footer";
import Comment from "./Comment";
import { data } from "./data";
import { Container } from "./style";

function NestedComments() {
  const [allComments, setAllComments] = useState([]);
  const [topLevelComments, setTopLevelComments] = useState([]);

  var ID = function () {
    return "_" + Math.random().toString(36).substr(2, 9);
  };

  useEffect(() => {
    setAllComments(data);
    const newComments = data.filter((comm) => comm.parentId === null);
    setTopLevelComments(newComments);
  }, []);

  const getReplies1 = (id) => {
    return allComments
      .filter((comment) => comment.parentId === id)
      .sort((a, b) => (new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1));
  };

  const likeComment = (id) => {
    const idx = allComments.findIndex((comment) => comment.id === id);
    const newComments = [...allComments];
    newComments[idx].likes += 1;
    setAllComments(newComments);
  };

  const onReplyClick = (id, content) => {
    const newComm = {
      id: ID(),
      content,
      Author: "John Doe",
      createdAt: new Date(),
      parentId: id,
      likes: 0,
    };
    setAllComments((prev) => [...prev, newComm]);
  };

  return (
    <Container>
      {topLevelComments.map((comment) => (
        <Comment
          key={comment.id}
          data={comment}
          getReplies1={getReplies1}
          onReplyClick={onReplyClick}
          likeComment={likeComment}
        />
      ))}
      <Footer />
    </Container>
  );
}

export default NestedComments;
