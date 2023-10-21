import React, { useEffect } from "react";
import "./_User.scss";
import HeroSection from "../components/HeroSection/HeroSection";
import SideBarSection from "../components/SideBarSection/SideBarSection";
import MainContainer from "../components/MainContainer/MainContainer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FollowersSection from "../components/FollowersSection/FollowersSection";
import FriendsSection from "../components/FriendsSection/FriendsSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../store/Slices/GetUser";
import AccueilSection from "../components/AccueilSection/AccueilSection";
import Lottie from "lottie-react";
import reloding from "../assets/animation/animation_lnus05nk.json";
import { handelChangeEmail } from "../store/Slices/GetEmail";

export default function User() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { type } = useParams();

  const location = useLocation();
  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const data = useSelector((state) => state.getUser.data) || []; // Initialize as an empty array
  const Email = useSelector((state) => state.getEmail.email);

  useEffect(() => {
    const currentEmail = localStorage.getItem("email");

    if (currentEmail && location.pathname.includes("user/invitation/profile")) {
      dispatch(handelChangeEmail(currentEmail));
      Navigate("/user/profile");
    }
  }, [dispatch, Navigate, location.pathname]);

  if (!data.length) {
    return (
      <div>
        <Lottie animationData={reloding} className="reloding" />
      </div>
    ); // Add a loading indicator or handle the loading state
  }

  const LastAboutDataForUser = data.filter((state) => state.email === Email);
  if (localStorage.getItem("authToken") === "") {
    console.log("jjsj");
    Navigate("/login");
  }

  return (
    <>
      <div className="User">
        <>
          {location.pathname.includes("user/invitation/profile") ? (
            <span className="backToHome" onClick={handelRelod}>
              Back to Your Profile
            </span>
          ) : null}
          {LastAboutDataForUser && LastAboutDataForUser.length > 0 && (
            <HeroSection data={LastAboutDataForUser[0]} />
          )}
        </>
        {type === "profile" ? (
          <div className="mainSection">
            <SideBarSection data={LastAboutDataForUser} /> <MainContainer />
          </div>
        ) : type === "followers" ? (
          <FollowersSection />
        ) : type === "friends" ? (
          <FriendsSection />
        ) : type === "gallery" ? (
          <GallerySection />
        ) : type === "accueil" ? (
          <AccueilSection />
        ) : type === "invitation" ? (
          <div className="mainSection">
            <SideBarSection data={LastAboutDataForUser} /> <MainContainer />
          </div>
        ) : null}
      </div>
    </>
  );
}
