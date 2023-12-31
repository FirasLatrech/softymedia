import { useDispatch } from "react-redux";
import { setToken } from "../utils/Helpers";
import { useNavigate } from "react-router-dom";
import { handelChnageIdUser } from "../store/Slices/GetEmail";
export default async function RegisterFunction(
  username,
  email,
  password,
  Navigate,
  profileId
) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/auth/local/register`,
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          profile: profileId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setToken(data.jwt);
      Navigate("/user/profile");
    } else {
      console.error("Please verify your data.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
