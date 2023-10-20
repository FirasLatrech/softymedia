// export default async function UpdatePost(id, like) {
//   try {
//     const response = await fetch(`http://localhost:1337/api/posts/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//       body: JSON.stringify({
//         data: {
//           like: like,
//         },
//       }),
//     });
//     console.log(response);
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//     } else {
//       console.error("Failed to update the post.");
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }
