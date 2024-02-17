import React, { useState } from "react";
import Cropper from "react-easy-crop";
import style from "./ImageCropper.module.css";

function ImageCropper({ onCropDone, onCropCancel, image }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  function onCropComplete(croppedAreaPercentage, croppedAreaPixels) {
    setCroppedArea(croppedAreaPixels);
  }
  function onAspectRatioChange(e) {
    setAspectRatio(e.target.value);
  }
  return (
    <div className={style.imageCropperContainer}>
      <div className={style.cropperContainer}>
        <Cropper
          image={image}
          aspect={aspectRatio}
          zoom={zoom}
          crop={crop}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              width: "100%",
              height: "80%",
              backgroundColor: "#000",
            },
          }}
        />
      </div>
      <div className={style.buttonsContainer}>
        <div className={style.ratiosButtons} onChange={onAspectRatioChange}>
          <input type="radio" value={1 / 1} name="ratio" />
          <input type="radio" value={5 / 4} name="ratio" />
          <input type="radio" value={4 / 3} name="ratio" />
          <input type="radio" value={3 / 2} name="ratio" />
          <input type="radio" value={5 / 3} name="ratio" />
          <input type="radio" value={16 / 9} name="ratio" />
          <input type="radio" value={3 / 1} name="ratio" />
        </div>
        <div className={style.actionBtns}>
          <button
            className={style.cropBtn}
            onClick={() => onCropDone(croppedArea)}
          >
            Crop & Upload
          </button>
          <button className={style.cancelBtn} onClick={onCropCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageCropper;
