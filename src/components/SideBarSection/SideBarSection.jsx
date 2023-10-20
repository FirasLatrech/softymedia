import React from "react";
import "./_SideBarSection.scss";
import { HiEnvelope, HiMiniBriefcase, HiMiniMapPin } from "react-icons/hi2";
import facebook from "../../assets/icons/Facbook.svg";
import Instagram from "../../assets/icons/Instagram.svg";
import Linkedin from "../../assets/icons/Linkedin.svg";
import Twitter from "../../assets/icons/Twitter.svg";

export default function SideBarSection({ data }) {
  const result = data[0];

  return (
    <div className="SideBar">
      <div className="FollowerAndFollowing">
        <div className="Follower">
          <h5>{result?.followers?.length}</h5>
          <span>Follower</span>
        </div>
        <span className="hr"></span>
        <div className="Follower">
          <h5>{result?.friends?.length}</h5>
          <span>Following</span>
        </div>
      </div>
      {result?.about != null ? (
        <div className="About">
          <h5>About</h5>
          <p>{result?.about?.about_me}</p>
          <div className="position">
            <HiMiniMapPin />
            <span className="fontSize">
              Live at{" "}
              <span className="underLine">{result?.about?.live_in}</span>
            </span>
          </div>
          <div className="Email flex">
            <HiEnvelope />
            <span className="fontSize">{result?.about?.email}</span>
          </div>
          <div className="work flex">
            <span>
              <HiMiniBriefcase />
            </span>

            <span className="fontSize">
              Data Analyst at
              <span className="underLine "> {result?.about?.work}</span>
            </span>
          </div>
          <div className="work flex">
            <HiMiniBriefcase />
            <span className="fontSize">
              Studied at{" "}
              <span className="underLine">{result?.about?.Study}</span>
            </span>
          </div>
        </div>
      ) : null}

      <div className="Social">
        <h5>Social</h5>
        <div className="Facebook">
          <img src={facebook} alt="" className="facebook" />
          <span>https://www.facebook.com/{result?.username}</span>
        </div>
        <div className="Instagrame">
          <img src={Instagram} alt="" />
          <span>https://www.instagram.com/{result?.username}</span>
        </div>
        <div className="Linkedin">
          <img src={Linkedin} alt="" />
          <span>https://www.linkedin.com/in/{result?.username}</span>
        </div>
        <div className="Twitter">
          <img src={Twitter} alt="" />
          <span>https://www.twitter.com/{result?.username}</span>
        </div>
      </div>
    </div>
  );
}
