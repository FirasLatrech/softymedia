import React from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/Images/avatar/avatar_20.png";
import "./_Hearder.scss";
import {
  handelChangeEmail,
  handelChnageShearchBar,
} from "../store/Slices/GetEmail";
import { useNavigate } from "react-router-dom";
export default function ProfileCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdate = (email) => {
    dispatch(handelChangeEmail(email));
    navigate(`user/invitation/profile`);
    dispatch(handelChnageShearchBar(false));
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
