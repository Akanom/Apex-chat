import React from "react";

const PostList = (props) => {
  return (
    <div style={{ marginTop: "24px" }}>
      {props.posts.map((item, j) => {
        return <Post post={item} key={j} onRemove={props.removeUpdate} />;
      })}
    </div>
  );
};
PostList.propTypes = {
  posts: propTypes.array.isRequired,
  removeUpdate: propTypes.func.isRequired,
};

export default PostList;
