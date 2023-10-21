import React, { useRef, useState, useEffect } from "react";
import imageVideoIcon from "../../../assets/icons/ImageVideo.svg";
import Streaming from "../../../assets/icons/Streaming.svg";
import { useDispatch, useSelector } from "react-redux";
import { createNewPost, fetchPostData } from "../../../store/Slices/GetPost";
import { useNavigate } from "react-router-dom";
import uplod_animation from "../../../assets/animation/animation_lnsnnnh1.json";
import Lottie from "lottie-react";
import { fetchUserData } from "../../../store/Slices/GetUser";
import uploadImageToStrapi from "../../../services/apiPostPhoto";
import uplodImageAnimation from "../../../assets/animation/animation_lnwvq87r.json";
import { handelChnageUploding } from "../../../store/Slices/GetEmail";
export default function NewPost() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [upload, setUpload] = useState(false);
  const [url, setUrl] = useState("");
  const [files, setFile] = useState();

  const id = useSelector((state) => state.getEmail.id);
  // const Email = useSelector((state) => state.getEmail.email);
  const Email = localStorage.getItem("email");
  const [errer, setErre] = useState(null);
  const profileId = useSelector((state) => state.getUser.data);
  const result = profileId.filter((state) => state.email === Email);
  const handelUplod = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const url = await uploadImageToStrapi(file);
    setUrl("http://localhost:1337" + url);
  };
  if (url == "") {
    dispatch(handelChnageUploding(false));
  } else {
    dispatch(handelChnageUploding(true));
  }
  const handlePost = async () => {
    console.log();
    setUpload(true);
    if (id && url) {
      const data = {
        id: result[0]?.profile?.id,
        imageUrl: url,
        text: text,
      };
      await dispatch(createNewPost(data));
      await dispatch(fetchUserData());

      setImageUrl("");
      setText("");
      setUpload(false);
    } else {
      console.error("ID or Image URL is missing!");
    }
  };
  const uplod = useSelector((state) => state.getEmail.uploding);
  return (
    <div className="MainContainer">
      {upload ? (
        <Lottie animationData={uplod_animation} className="uplod_animation" />
      ) : (
        <div className="NewPost">
          <textarea
            name=""
            id=""
            cols="30"
            rows="4"
            placeholder="Share what you are thinking here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="new_Post">
            <div className="rightButton">
              <div className="button">
                {/* <input
                  className="file-input"
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif , .rar ,.zip  ,.pdf ,.svg"
                  onChange={(e) => handelUplod(e)}
                /> */}
                <label className="file-upload-label">
                  <input
                    className="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif , .rar ,.zip  ,.pdf ,.svg"
                    onChange={(e) => handelUplod(e)}
                  />
                  <span className="file-upload-text">
                    <Lottie
                      animationData={uplodImageAnimation}
                      className="uplodImageAnimation"
                    />
                    Image/Video
                  </span>
                </label>
              </div>
              {files && (
                <span>
                  {" "}
                  {files.name.length > 10
                    ? files.name.substr(0, 10) + "..."
                    : files.name}
                </span>
              )}

              <div className="button">
                <img src={Streaming} alt="" className="Streaming" />
                <span>Streaming</span>
              </div>
            </div>

            <button
              type="button"
              className={uplod == false ? "Post dispabled" : "Post"}
              onClick={handlePost}
              disabled={uplod == false ? true : false}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
