import { useState, useEffect } from "react";
import tryCatch from "../components/TryCatch";

export default function Blog() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const response = await tryCatch("blogPosts");
      console.log("response", response);
      if (response) {
        setPosts(response);
      }
    }
    fetchPosts()
  }, []); // empty for now


  return( <div>{posts.map(entry => {
    <div>
      <div>{entry.title}</div>
      <div>{entry.image}</div>
      <div>{entry.description}</div>
    </div>;
  }) }</div>)
}
