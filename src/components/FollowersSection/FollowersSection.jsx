import React from "react";
import FollowersCard from "./FollowersCard";
import "./_FollowersSection.scss";
import { useSelector } from "react-redux";
export default function FollowersSection() {
  const Emaill = useSelector((state) => state.getEmail.email);
  const data = useSelector((state) => state.getUser.data);
  const result = data?.filter((state) => {
    return state?.email == Emaill;
  });
  const followers = result[0].followers;

  return (
    <div className="followers">
      <h3>Followers</h3>
      <div className="AllCard">
        {followers == undefined
          ? null
          : followers.map((item, index) => (
              <FollowersCard result={item} key={index} />
            ))}
      </div>
    </div>
  );
}
