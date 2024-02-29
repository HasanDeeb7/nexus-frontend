import React, { useState } from "react";
import Post from "../../components/Post/Post";
import axios from "axios";
import FYPage from "../ForYou Page/FYPage";
import PostsLayout from "../../layouts/PostsLayout/PostsLayout";

function ExplorePage() {
  return <PostsLayout url={"post/"} />;
}

export default ExplorePage;
