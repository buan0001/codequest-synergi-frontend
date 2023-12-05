// import { useEffect, useState } from "react";
// import { CVImage } from "../assets/CVImage";
import FetchPageOne from "../components/FetchPageOne";

export default function Home() {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  // async function fetchData() {
  //   const response = await fetch("VORES DATABASE ENDPOINT HER !!!!!!!!!!!!!!!!!!!");
  //   const data = await response.json();
  //   // setData(data);
  // }
  // fetchData();
  // }, []);

  return (
    <>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <FetchPageOne />
    </>
  );
}
