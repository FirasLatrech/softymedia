import React from "react";
import CartContainer from "../MainContainer/Components/CartContainer/CartContainer";
import { useSelector } from "react-redux";
import "./_AccueilSection.scss";

export default function AccueilSection() {
  const userData = useSelector((state) => state.getUser.data);
  const userEmail = useSelector((state) => state.getEmail.email);
  const personalData = userData.filter((state) => state.email === userEmail);
  return (
    <div>
      {Array.isArray(personalData) &&
        userData.map((user, userIndex) => {
          const reversedPosts = [...user?.profile?.posts].reverse();
          return (
            <div key={userIndex} className="detailss">
              {Array.isArray(reversedPosts) &&
                reversedPosts.map((item, index) => (
                  <CartContainer
                    key={index}
                    data={item}
                    details={user}
                    personalData={personalData}
                  />
                ))}
            </div>
          );
        })}
    </div>
  );
}
