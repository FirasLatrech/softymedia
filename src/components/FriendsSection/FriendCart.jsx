import React from "react";
import ThreePoint from "../../assets/icons/ThreePoint.svg";
import avatar1 from "../../assets/Images/avatar/avatar_20.png";
import facebook from "../../assets/icons/Facbook.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import Linkedin from "../../assets/icons/Linkedin.svg";
import Twitter from "../../assets/icons/Twitter.svg";
export default function FriendCart({ data }) {
  return (
    <div className="Cart">
      <img src={ThreePoint} alt="" className="ThreePoint" />
      <div className="textContainer">
        <img
          src={data.Picture === null ? avatar1 : data.Picture}
          alt=""
          className="avatar"
        />
        <h4>{data.username}</h4>
        <h6>{data.email}</h6>
        <div className="linkers">
          <img src={facebook} alt="" className="facebook" />
          <img src={Instagram} alt="" className="Instagrame" />
          <img src={Linkedin} alt="" className="Linkedin" />
          <img src={Twitter} alt="" className="Twitter" />
        </div>
      </div>
    </div>
  );
}
