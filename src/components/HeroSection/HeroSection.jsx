import React, { useEffect, useState } from "react";
import "./_HeroSection.scss";
import avatar from "../../assets/Images/avatar/avatar_20.png";
import ProfileIcon from "../../assets/icons/profileIcon.svg";
import Followers from "../../assets/icons/Followers.svg";
import Friends from "../../assets/icons/Friends.svg";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  handelAddFreind,
  handelChangeEmail,
  handelChangeId,
  handelOpenTheModel,
} from "../../store/Slices/GetEmail";
import { HiPencil, HiUserMinus, HiUserPlus } from "react-icons/hi2";
import close from "../../assets/animation/animation_lnvjvl9b.json";
import dataAnimation from "../../assets/animation/animation_lnvkrp98.json";

import Lottie from "lottie-react";
import GetUser, {
  fetchUserData,
  updateFriends,
  updateUserData,
} from "../../store/Slices/GetUser";
import uploadImageToStrapi from "../../services/apiPostPhoto";
import uplodImageAnimation from "../../assets/animation/animation_lnwvq87r.json";
export default function HeroSection({ data }) {
  const pictureUrl = data.Picture;
  const navigate = useNavigate();

  const location = useLocation();
  const pathname = location.pathname;
  const { type } = useParams();

  const [username, setUsername] = useState(data?.username);
  const [email, setEmail] = useState(data?.email);
  const [picture, setPicture] = useState(data?.Picture);
  const [url, setUrl] = useState("");
  const [usernameErrer, setUserNameErrer] = useState(false);
  const [emailErrer, setEmailErrer] = useState(false);
  const handelUplod = async (e) => {
    const file = e.target.files[0];
    const url = await uploadImageToStrapi(file);
    setUrl("http://localhost:1337" + url);
  };
  const CurrentEmail = localStorage.getItem("email");

  const userDataForUpdatingFreind = useSelector((state) =>
    state.getUser.data.filter((item) => item.email == CurrentEmail)
  );
  const addFriende = useSelector((state) => state.getEmail.AddFriend);
  const current_follower = [];
  const follower = userDataForUpdatingFreind[0]?.followers;
  follower?.map((item) => current_follower.push(item.id));
  useEffect(() => {
    if (current_follower.indexOf(data.id) != -1) {
      dispatch(handelAddFreind(true));
    } else {
      dispatch(handelAddFreind(false));
    }
  }, [data.id]);

  const dispatch = useDispatch();
  dispatch(handelChangeId(data?.id));

  const handeUpdateUser = async () => {
    if (username.length == 0) {
      setUserNameErrer(true);
    }
    if (email.length == 0) {
      setEmailErrer(true);
    } else {
      const id = data.id;
      const updatedData = {
        id: id,
        username: username,
        email: email,
        picture: url,
      };

      const result = await dispatch(updateUserData(updatedData));
      dispatch(handelChangeEmail(result.payload.email));
      await dispatch(fetchUserData());
    }
  };
  const modelOpen = useSelector((state) => state.getEmail.OpenTheModel);

  const handleModelOpen = () => {
    dispatch(handelOpenTheModel(!modelOpen));
  };
  const CurentIdUser = localStorage.getItem("id");

  const handeAddAnvitaion = () => {
    const id = data.id;
    if (current_follower.indexOf(id) === -1) {
      dispatch(handelAddFreind(true));

      current_follower.push(id);
      dispatch(updateFriends({ current_follower, CurentIdUser }));
      dispatch(handelChangeEmail(CurrentEmail));
      dispatch(fetchUserData());
      navigate("/user/profile");
    } else {
      dispatch(handelAddFreind(false));

      const index_element = current_follower.indexOf(id);
    }
  };
  return (
    <>
      {pathname.includes("/user/invitation") != true ? (
        <div className={modelOpen ? "model" : "model displaynone"}>
          <div className="hero">
            <Lottie
              animationData={close}
              className="reloding"
              loop={true}
              onClick={handleModelOpen}
            />
          </div>
          <div className="underHero">
            <Lottie
              animationData={dataAnimation}
              className="dataAnimation"
              loop={true}
            />
          </div>

          <div className="mainContainer">
            <div>
              <label htmlFor="username">User Name:</label>
              <input
                type="text"
                value={username}
                className={usernameErrer == true ? "errer" : null}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="username">Email :</label>
              <input
                type="email"
                value={email}
                className={emailErrer == true ? "errer" : null}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="picture">Upload Picture :</label>
              <label className="file-upload-label uplodContainer">
                <input
                  className="file-input"
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif , .rar ,.zip  ,.pdf ,.svg"
                  onChange={(e) => handelUplod(e)}
                />
                <span className="file-upload-text">
                  <Lottie
                    animationData={uplodImageAnimation}
                    className="uplodImageAnimation"
                  />
                  <span className="textContenteForUplod">Image</span>
                </span>
              </label>
            </div>
            <div className="buttons">
              <button className="update" onClick={handeUpdateUser}>
                Update
              </button>
              <button className="close" onClick={handleModelOpen}>
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="Profile">
        <div className="ImgCover"></div>
        <div className="underCover">
          <div className="rightContaine profile">
            <img
              src={pictureUrl == "" || pictureUrl == null ? avatar : pictureUrl}
              alt="avatar_3"
              className="avatar_picture"
            />
            <div className="aboutme">
              <h3>{data?.username}</h3>
              <span>{data.about == null ? "No work " : data.about.work}</span>
            </div>
          </div>
          <div>
            {pathname.includes("/user/invitation") != true ? (
              <div className="updateProfile" onClick={handleModelOpen}>
                <HiPencil />
              </div>
            ) : (
              <div
                className="updateProfile addFriend"
                onClick={handeAddAnvitaion}
              >
                <span className="addIcon">
                  {addFriende === false ? <HiUserPlus /> : <HiUserMinus />}
                </span>
                {addFriende === false ? "Add Friend" : "Cancel"}
              </div>
            )}
            {type != "invitation" ? (
              <div className="Lines">
                <NavLink to="/user/accueil">
                  <div className="lien">
                    <img src={ProfileIcon} alt="" />
                    <span>Accueil</span>
                  </div>
                </NavLink>
                <NavLink to="/user/profile">
                  <div className="lien">
                    <img src={ProfileIcon} alt="" />
                    <span>Profile</span>
                  </div>
                </NavLink>
                <NavLink to="/user/followers">
                  <div className="lien">
                    <img src={Followers} alt="" />
                    <span>Followers</span>
                  </div>
                </NavLink>
                <NavLink to="/user/friends">
                  <div className="lien">
                    <img src={Friends} alt="" />
                    <span>Friends</span>
                  </div>
                </NavLink>
              </div>
            ) : (
              <div className="Lines">
                <NavLink to="/user/invitation/profile">
                  <div className="lien">
                    <img src={ProfileIcon} alt="" />
                    <span>Profile</span>
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
