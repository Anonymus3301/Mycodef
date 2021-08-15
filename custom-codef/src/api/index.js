import axios from "axios";

const url = "https://codef-backend.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
