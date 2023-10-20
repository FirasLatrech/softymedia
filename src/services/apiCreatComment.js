// export default async function CreatComment(
//   id,
//   Name,
//   comment_description,
//   picture
// ) {
//   try {
//     const response = await fetch("http://localhost:1337/api/comments", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//       body: JSON.stringify({
//         data: {
//           Name: Name,
//           post: id,
//           comment_description: comment_description,
//           picture: picture,
//         },
//       }),
//     });
//     console.log(response);
//     if (response.ok) {
//       const data = await response?.json();
//       console.log(data);
//     } else {
//       console.error("Failed to create a profile.");
//     }
//   } catch (error) {
//     console.error("Fetch error:", error);
//   }
// }
