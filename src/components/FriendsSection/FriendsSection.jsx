import React, { useState } from "react";
import FriendCart from "./FriendCart";
import "./FriendsSection.scss";
import { useSelector } from "react-redux";

export default function FriendsSection() {
  const Emaill = useSelector((state) => state.getEmail.email);
  const data = useSelector((state) => state.getUser.data);
  const result = data?.filter((state) => {
    return state?.email == Emaill;
  });
  const FirendData = result[0].friends;

  const [newData, setNewData] = useState(FirendData);
  const handelFind = (e) => {
    const value = e.target.value;
    const DataAfterFilter = FirendData.filter((state) => {
      return state.username.toLowerCase().includes(value.toLowerCase());
    });
    setNewData(DataAfterFilter);
  };
  return (
    <div>
      <div className="Hero">
        <span>Friends</span>
        <div className="Search">
          <input
            type="text"
            name=""
            id=""
            placeholder="Search friends..."
            onChange={(e) => handelFind(e)}
          />
        </div>
      </div>
      <div className="AllFriendCart">
        {newData &&
          newData.map((item, index) => {
            return <FriendCart data={item} key={index} />;
          })}
      </div>
    </div>
  );
}
