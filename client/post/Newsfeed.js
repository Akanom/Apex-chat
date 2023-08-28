import { Divider, Typography } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import Card from "@material-ui/core";
import Typography from "@material-ui/core";
import Divider from "@material-ui/core";
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'
import NewPost from './NewPost'



const Newsfeed = () => {
  const addPost = (post) => {
    const updatePosts = [...posts];
    updatePosts.unshift(post);
    setPosts(updatedPosts);
  };
  const removePost = (post) => {
    const updatedPosts = [...posts];
    const index = updatedPosts.indexOf(post);
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };
  useEffect(() => {
    const abortController=new AbortController()
    const signal=abortController.signal
    listNewsFeed({
      userId:jwt.user._id
    },{
      t:jwt.token
    },signal).then((data)=>{
      if(data.error){
        console.log(data.error)
      } else{
        setPosts(data)
      }
    })
    return function cleanup(){
      abortController.abort()
    }
  }, [])
  
  return (
    <div>
      <Card>
        <Typography type="title">Newsfeed</Typography>
        <NewPost addUpdate={addPost} />
        <Divider />
        <PostList removeUpdate={removePost} posts={posts} />
      </Card>
    </div>
  );
};



export default Newsfeed;
