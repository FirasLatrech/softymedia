import React, { useState, useEffect } from "react";
import threePoint from "../../../../assets/icons/ThreePoint.svg";
import Followers from "../../../../assets/icons/Followers.svg";
import Avatar from "../../../../assets/Images/avatar/avatar_20.png";
import NonAvatar from "../../../../assets/Images/avatar/avatar_20.png";
import "./_CartContainer.scss";
import {
  HiChatBubbleOvalLeftEllipsis,
  HiMiniShare,
  HiPaperAirplane,
} from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { createCommentAsync } from "../../../../store/Slices/CreateComment";
import { updatePost } from "../../../../store/Slices/GetPost";
import GetUser, { fetchUserData } from "../../../../store/Slices/GetUser";

export default function CartContainer({ data, details, personalData }) {
  const { type } = useParams();

  const dispatch = useDispatch();
  const [like, setLike] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (data.like && data.like.length > 0) {
      const likeId = data.like.map((state) => state.id);
      setLike(likeId);
    }
  }, [data.like]);

  const handleAddComments = async () => {
    try {
      if (comment) {
        const post_id = data.id;
        const comment_description = comment;
        const name =
          type === "accueil" || "profile"
            ? personalData[0]?.username || ""
            : details?.username || "";

        const picture =
          type === "accueil" || "profile"
            ? personalData[0]?.Picture || ""
            : details?.Picture || "";
        await dispatch(
          createCommentAsync({
            id: post_id,
            name,
            comment_description,
            picture,
          })
        );
        setComment("");
        await dispatch(fetchUserData());
      } else {
        console.error("Comment cannot be empty.");
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handeUpdatLike = async () => {
    try {
      let newArray = [...like];
      const id =
        type === "accueil" || "profile" ? personalData[0].id : details.id;

      if (newArray.includes(id)) {
        newArray = newArray.filter((item) => item !== id);
      } else {
        newArray.push(id);
      }

      setLike(newArray);

      await dispatch(updatePost({ id: data.id, like: newArray }));
      await dispatch(fetchUserData());
    } catch (error) {
      console.error("Failed to update the post:", error);
    }
  };
  const changeData = (curentdate) => {
    const date = new Date(curentdate);

    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  return (
    <div className={type == "accueil" ? " acceruil" : "mainContainer"}>
      {details && (
        <div className="CardContainer">
          <div className="Hero">
            <div className="rightImgContainer">
              <img src={details?.Picture || Avatar} alt="avatar" />
              <div className="textContainer">
                <span className="FullName">{details?.username}</span>
                <span className="DateCreated">
                  {changeData(data.createdAt)}
                </span>
              </div>
            </div>
            <img src={threePoint} alt="threePoint" className="threePoint" />
          </div>
          <p>{data.description}</p>
          <div className="PostImg">
            <img src={data.Picture} alt="postImage" />
          </div>
          <div className="UnderImg">
            <div className="Avatars">
              <img
                src={Followers}
                alt="followers"
                className={
                  data.like.length == 0
                    ? " zeroFollower cursur"
                    : "Followers cursur"
                }
                onClick={handeUpdatLike}
              />
              <span>{data.like.length}</span>
              {data.like.length > 0 && (
                <div className="AvatarContainer">
                  {data.like.slice(0, 4).map((item, index) => (
                    <img
                      key={index}
                      src={item.Picture || Avatar}
                      alt="avatar"
                      className={`avatarImg ${
                        index > 0 ? "avatarImg" + index : ""
                      }`}
                    />
                  ))}
                  {data.like.length > 4 && (
                    <span className="morePerson">+{data.like.length - 4}</span>
                  )}
                </div>
              )}
            </div>
            <div className="leftIconsContainer">
              <HiChatBubbleOvalLeftEllipsis />
              <HiMiniShare />
            </div>
          </div>
          <div className="allComments">
            {data.comments &&
              data.comments.length > 0 &&
              data.comments.map((item, index) => (
                <div className="CommentContainer" key={index}>
                  <img src={item.picture || NonAvatar} alt="avatar" />
                  <div className="textContenet">
                    <h5 className="FullName">{item.Name}</h5>
                    <p className="paragraph">{item.comment_description}</p>
                    <span className="Data_comment">
                      {" "}
                      {changeData(item.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="AddComment">
            <img
              src={
                type === "accueil" || "profile"
                  ? personalData[0]?.Picture || Avatar
                  : details?.Picture || Avatar
              }
              alt="avatar"
            />
            <div className="InputContainer">
              <input
                type="text"
                name=""
                id=""
                placeholder="Write a comment…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div
                className="photoContainer cursur"
                onClick={handleAddComments}
              >
                <HiPaperAirplane />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
