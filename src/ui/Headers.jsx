import React, { useEffect, useState } from "react";
import shearchIcon from "../assets/icons/searchIcon.svg";
import ENglishFlagIcon from "../assets/icons/EnglishLanguagFlag.svg";
import NotifcationIcon from "../assets/icons/NotifcationIcon.svg";
import SettingIcon from "../assets/icons/SettingIcon.svg";
import avatar from "../assets/Images/avatar/avatar_3.jpg";
import FriendIcon from "../assets/icons/FirendIcon.svg";
import "./_Hearder.scss";
import { NavLink } from "react-router-dom";
import ProfileCart from "./ProfileCart";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { fetchUserData } from "../store/Slices/GetUser";
import { handelChnageShearchBar } from "../store/Slices/GetEmail";

export default function Header() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const userDataBeforFilter = useSelector((state) => state.getUser.data);
  const Email = localStorage.getItem("email");
  const shearchBarIsOpne = useSelector((state) => state.getEmail.shearchBar);

  useEffect(() => {
    if (Array.isArray(userDataBeforFilter)) {
      const filteredData = userDataBeforFilter.filter((state) => {
        return (
          state.username.toLowerCase().includes(value.toLowerCase()) &&
          state.email !== Email
        );
      });
      setUserData(filteredData);
    }
  }, [value, userDataBeforFilter, Email]);

  return (
    <div className="Header">
      <div className="rightContainer">
        <img
          src={shearchIcon}
          alt=""
          onClick={() => dispatch(handelChnageShearchBar(!shearchBarIsOpne))}
        />
        <span>⌘K</span>
      </div>
      {shearchBarIsOpne && (
        <div className="FindUser">
          <div className="Search">
            <div className="InputButton">
              <HiMiniMagnifyingGlass />
              <input
                type="text"
                placeholder="Rechercher"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="allProfile">
              {userData &&
                userData.map((data, index) => (
                  <ProfileCart key={index} data={data} />
                ))}
            </div>
          </div>
        </div>
      )}
      <div className="leftContainer">
        <img src={ENglishFlagIcon} className="flag" alt="" />
        <div className="NotificationContainer">
          <span className="notificationNumber">3</span>
          <img src={NotifcationIcon} alt="" />
        </div>
        <img src={FriendIcon} alt="" />

        <img
          src={SettingIcon}
          alt=""
          className="SettingIcon"
          onClick={() => setIsOpen((show) => !show)}
        />
        <img src={avatar} className="Avatar" alt="" />
        {isOpen && (
          <div className="parametre">
            <NavLink to="login">logout</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
