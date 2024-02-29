import { useEffect, useState } from "react";
import { useLoadingStore } from "../../Store/loadingStore";
import style from "./FYPage.module.css";
import { usePostStore } from "../../Store/postStore";
import axios from "axios";
import Post from "../../components/Post/Post";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
// import image from "/public/images/fypage_portrait.jpg";
import video from "/public/videos/bgVideo.mp4";
function FYPage({ url }) {
  return (
    <>
      <PostsLayout url={"post/byGames"} />
    </>
  );
}

export default FYPage;
