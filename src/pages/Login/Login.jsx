import React, { useEffect, useState } from "react";
import illustrations from "../../assets/illustrations/illustration_dashboard.png";
import OpenEyesIcon from "../../assets/icons/OpenEyes.svg";
import CloseEyesIcon from "../../assets/icons/CloseEyes.svg";
import { setToken } from "../../utils/Helpers";
import { useLocation, useNavigate } from "react-router-dom";
import ForgetPassword from "../ForgetPassword/ForgetPassword";
import CreateProfile from "../../services/apiCreateProfile";
import { useDispatch } from "react-redux";
import { API } from "../../../Auth/constant";
import "./_Login.scss";
import {
  handelChangeEmail,
  handelChangeId,
  handelChnageIdUser,
} from "../../store/Slices/GetEmail";

export default function Auth() {
  const Navigate = useNavigate();
  const Location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("authToken") !== "") {
      Navigate("/user/profile");
    }
  }, [Location.pathname]);

  const [isOpne, setIsopen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileId, setProfileId] = useState(null);
  const dispatch = useDispatch();

  const handleCreateProfile = async () => {
    const profileId = await CreateProfile(email);
    return profileId;
  };

  async function handelLgoin(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("email", data.user.email);
        dispatch(handelChangeEmail(data.user.email));
        dispatch(handelChangeId(data.user.id));
        dispatch(handelChnageIdUser(data.user.id));
        localStorage.setItem("id", data.user.id);

        setToken(data.jwt);
        setSucces(() => true);

        setTimeout(() => {
          Navigate("/user/profile", { state: { data: data.user } });
          setSucces(() => null);
        }, 1000);
      } else {
        setSucces(() => false);

        setTimeout(() => {
          setSucces(() => null);
        }, 2000);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  const FullNamee = firstName + lastName;

  const handleRegister = async (e) => {
    e.preventDefault();
    const profileId = await handleCreateProfile();
    const fullName = firstName + " " + lastName;

    try {
      const response = await fetch(
        `http://localhost:1337/api/auth/local/register`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            username: fullName,
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
        setSucces(() => true);

        localStorage.setItem("email", data.user.email);
        dispatch(handelChangeEmail(data.user.email));
        dispatch(handelChangeId(data.user.id));
        dispatch(handelChnageIdUser(data.user.id));
        localStorage.setItem("id", data.user.id);
        setTimeout(() => {
          Navigate("/user/profile");
          setSucces(() => null);
        }, 2000);
      } else {
        setSucces(() => false);
        setTimeout(() => {
          setSucces(() => null);
        }, 2000);
        console.error("Please verify your data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [succes, setSucces] = useState(null);

  return (
    <>
      {succes != null && (
        <div className={succes === true ? "popupgreen" : "popupred"}>
          {succes === true
            ? "welcome to your account"
            : "Please verify your data."}
        </div>
      )}

      {Location.pathname.includes("/forgot-password") ? (
        <ForgetPassword />
      ) : Location.pathname.includes("/login") ? (
        <form onSubmit={(e) => handelLgoin(e)}>
          <div className="LoginSection">
            <div className="ImageContainer">
              <img src={illustrations} alt="" />
            </div>
            <div className="LoginForm">
              <h5>Sign in to Minimal</h5>
              <span className="NewAccount">
                New user ?{" "}
                <span
                  onClick={() => {
                    Navigate("/register");
                  }}
                >
                  Create an account
                </span>
              </span>
              <div className="InputContainer">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="EmailAdress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="Password">
                  <input
                    type={!isOpne ? "password" : "text"}
                    placeholder="Password"
                    className="PasswordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={isOpne ? OpenEyesIcon : CloseEyesIcon}
                    alt=""
                    className="OpneEyes"
                    onClick={() => setIsopen((show) => !show)}
                  />
                </div>
                <span
                  className="Forgotpassword"
                  onClick={() => {
                    Navigate("/forgot-password");
                  }}
                >
                  Forgot password ?
                </span>
              </div>
              <button className="Login" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      ) : (
        <form onSubmit={(e) => handleRegister(e)}>
          <div className="LoginSection">
            <div className="ImageContainer">
              <img src={illustrations} alt="" />
            </div>
            <div className="LoginForm">
              <h5>Get started absolutely free</h5>
              <span className="NewAccount">
                Already have an account?
                <span onClick={() => Navigate("/login")}>Sign in</span>
              </span>
              <div className="InputContainer">
                <div className="FullName">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="First_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="Last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="text"
                  placeholder="Email Address"
                  className="EmailAdress"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="Password">
                  <input
                    type={isOpne ? "text" : "password"}
                    placeholder="Password"
                    className="PasswordInput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img
                    src={isOpne ? OpenEyesIcon : CloseEyesIcon}
                    alt=""
                    className="OpenEyes"
                    onClick={() => setIsopen((show) => !show)}
                  />
                </div>
              </div>
              <button className="Login" type="submit">
                Create account
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
