import { useEffect, useState } from "react";
import { useLoadingStore } from "../../Store/loadingStore";
import style from "./FYPage.module.css";
import { usePostStore } from "../../Store/postStore";
import axios from "axios";
import Post from "../../components/Post/Post";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";
// import image from "/public/images/fypage_portrait.jpg";
function FYPage({ url }) {
  return (
    <>
      <PostsLayout url={"post/byGames"} />
    </>
  );
}

export default FYPage;
