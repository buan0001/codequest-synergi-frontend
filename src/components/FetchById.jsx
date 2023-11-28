// import { useState, useEffect } from "react";

// export default function ItemDetail({ Id }) { // tror ikke det gør noget hvis det kommer "itemid is missing in props validation", måske tjek op på det
//   const [item, setItem] = useState(null);

//   useEffect(() => {
//     const fetchItem = async () => {
//       try {
//         const response = await fetch(`https://api.example.com/items/${Id}`);
//         if (!response.ok) {
//           throw new Error("Der opstod en fejl ved fetch");
//         }
//         const result = await response.json();
//         setItem(result);
//       } catch (error) {
//         console.error("Der opstod en fejl ved indlæsning af data:", error);
//       }
//     };

//     fetchItem();
//   }, [Id]);

//   return (
//     <div>
//       {item ? (
//         <div>
//           <h3>{item.first_name}</h3>
//           <p>{item.email}</p>
//           {/* Eventuelle andre props ind her som passet til objektet */}
//         </div>
//       ) : (
//         <p>Loading...</p> // Loading text hvis data ikke kan hentes
//       )}
//     </div>
//   );
// }
