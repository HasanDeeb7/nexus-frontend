import { useRef, useState } from "react";
import style from "./UploadImage.module.css";
import map from "/images/map.jpg";
import { useUserStore } from "../../Store/userStore";
import HexButton from "../../components/HexButton/HexButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageCropper from "../../components/ImageCropper/ImageCropper";
import { base64toBlob } from "../../utils/toFile";
import Avvvatars from "avvvatars-react";

function UploadImage() {
  const fileInputRef = useRef();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageCropper, setImageCropper] = useState(false);
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const avatar = import.meta.env.VITE_ENDPOINT + user.avatar;
  function fileInput() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }
  function onCropDone(imgCroppedArea) {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;
    const context = canvasEle.getContext("2d");

    let imageObj1 = new Image();
    imageObj1.src = image;
    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );
      const dataUrl = canvasEle.toDataURL("image/jpeg");
      setImgAfterCrop(dataUrl);
      updateImage(dataUrl);
      setImageCropper(false);
    };
  }
  function changeImage(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = function (e) {
        setImage(reader.result);
      };
      setImageCropper(true);
    }
  }
  function onCropCancel() {
    setImageCropper(false);
  }
  async function updateImage(image) {
    setLoading(false);
    const blob = base64toBlob(
      image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
    );
    const formData = new FormData();
    formData.append("image", blob, "image.jpg");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_ENDPOINT}user/upload-avatar`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response) {
         (response.data);
        setLoading(false);
        setUser(response.data.user);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  function proceed() {
    navigate("/select-games");
  }
  return !imageCropper ? (
    <>
      <img src={map} alt="" className={style.image} />
      <div className={style.uploadFormContainer}>
        <div className={style.modal}>
          <div className={style.contentWrapper}>
            <h1>Upload Image</h1>
            {user.avatar ? (
              <img src={avatar} alt="user image" className={style.userImage} />
            ) : (
              <Avvvatars value={user.username} size={250} />
            )}

            <input
              type="file"
              ref={fileInputRef}
              className={style.hiddenFileControl}
              onChange={changeImage}
            />
            {/* <label onClick={fileInput} className={style.uploadBtn}>Click Me</label> */}
            <div className={style.btnsContainer}>
              <button
                type="button"
                className={style.uploadImageBtn}
                onClick={fileInput}
              >
                Upload Image
              </button>
              <HexButton onClick={proceed} text={"Proceed"} />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <ImageCropper
      onCropDone={onCropDone}
      onCropCancel={onCropCancel}
      image={image}
    />
  );
}

export default UploadImage;
