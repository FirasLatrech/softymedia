export default async function uploadImageToStrapi(file) {
  try {
    const data = new FormData();
    data.append("files", file);

    const response = await fetch(
      `${import.meta.env.REACT_BACKEND_APP}api/upload`,
      {
        method: "POST",
        body: data,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        //   Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        // },
      }
    );
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    const imageUrl = res[0].url;

    return imageUrl;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
