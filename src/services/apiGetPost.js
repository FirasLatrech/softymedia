// export default async function getPost() {
//   try {
//     const response = await fetch(`http://localhost:1337/api/posts?populate=*`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "Application/json",
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//     });
//     const data = await response.json();
//     if (response.ok) {
//       return data;
//     }
//   } catch (error) {
//     console.log("Fetch error:", error);
//   }
// }
