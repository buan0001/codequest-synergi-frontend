// import { useEffect, useState } from "react";
// import { CVImage } from "../assets/CVImage";
import FetchPages from "../components/FetchPages";
// import FetchBooksAndArticles from "../components/FetchBooksAndArticles";

export default function Home() {
  const prop = 'forside';

  return (
      <FetchPages title={prop}/>
  );
}
