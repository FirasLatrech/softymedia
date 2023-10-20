import React, { useState } from "react";
import avatar1 from "../../assets/Images/avatar/avatar_20.png";
import { HiMiniAtSymbol } from "react-icons/hi2";
import "./_FollowersSection.scss";
import checkIcon from "./check.svg";
import { useSelector } from "react-redux";

export default function FollowersCard({ result }) {

  const [follow, setFollow] = useState(false);

  return (
    <div className="card">
      <img src={result.Picture === null ? avatar1 : result.Picture} alt="" />
      <div className="textContainer">
        <h5>{result.username}</h5>
        <span>
          <HiMiniAtSymbol />
          {result.email}
        </span>
      </div>
      {follow ? (
        <div className="Follow" onClick={() => setFollow(!follow)}>
          Follow
        </div>
      ) : (
        <div className="Followed" onClick={() => setFollow(!follow)}>
          <img src={checkIcon} alt="" className="checkIcon" />
          Followed
        </div>
      )}
    </div>
  );
}
