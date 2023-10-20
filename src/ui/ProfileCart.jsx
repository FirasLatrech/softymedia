import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/Images/avatar/avatar_20.png";
import "./_Hearder.scss";
import {
  handelChangeEmail,
  handelChnageShearchBar,
} from "../store/Slices/GetEmail";
import { useNavigate } from "react-router-dom";
import { fetchUserData } from "../store/Slices/GetUser";
export default function ProfileCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (email) => {
    dispatch(handelChangeEmail(email));
    dispatch(handelChnageShearchBar(false));
    dispatch(fetchUserData());
    navigate(`user/invitation/profile`);
  };

  return (
    <div className="profileCard" onClick={() => handleUpdate(data.email)}>
      <div className="leftSection">
        <img src={data.Picture === null ? avatar : data.Picture} alt="" />
        <span className="ProfileFullName">{data.username}</span>
      </div>
    </div>
  );
}
