import React from "react";
import "./_MainContainer.scss";
import NewPost from "./Components/NewPost";
import CartContainer from "./Components/CartContainer/CartContainer";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import notDataFoundAnimation from "../../assets/animation/animation_lnx2069c.json";
import Lottie from "lottie-react";
export default function MainContainer() {
  const location = useLocation();
  const user = useSelector((state) => state.getUser.data);
  const email = useSelector((state) => state.getEmail.email);

  const filteredResult = user.filter((state) => state.email === email);

  const finalData = filteredResult[0]?.profile?.posts
    ? [...filteredResult[0].profile.posts].reverse()
    : [];
  const userEmail = localStorage.getItem("email");
  const personalData = user.filter((state) => state.email === userEmail);
  return (
    <div className="MainContainerSection">
      {location.pathname.includes("/user/invitation/profile") == false ? (
        <NewPost />
      ) : null}

      {finalData.length !== 0 ? (
        finalData.map((state, index) => (
          <CartContainer
            key={`${state.id}-${index}`}
            data={state}
            details={filteredResult[0]}
            personalData={personalData}
          />
        ))
      ) : (
        <Lottie animationData={notDataFoundAnimation} className="noDataFOund" />
      )}
    </div>
  );
}
