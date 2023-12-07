// import { useEffect, useState } from "react";
// import { CVImage } from "../assets/CVImage";
import FetchPages from "../components/FetchPages";
import { useSelector } from "react-redux";
import Editor from "../components/CKEditor";
// import FetchBooksAndArticles from "../components/FetchBooksAndArticles";

export default function Home() {
  const loggedIn = useSelector((state) => state.loginState.loggedIn);
  const prop = "forside";

  return loggedIn ? (
    <div>
      <Editor title={prop} />
      <div className="p-4">
        <FetchPages title={prop} />
      </div>
    </div>
  ) : (
    <div className="p-4">
      <FetchPages title={prop} />
    </div>
  );
}
