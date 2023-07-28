import React, { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import html2canvas from "html2canvas";

const ImageCropPreview = () => {
  const [crop, setCrop] = useState({ unit: "%", width: 30, aspect: 1 });
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image) => {
    // You can do something when the image is loaded, if needed.
    imageRef.current = image;
  };

  const onCropComplete = (crop) => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageSrc && crop.width && crop.height) {
      try {
        const croppedImage = await getCroppedImg(imageSrc, crop);
        setCroppedImage(croppedImage);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const getCroppedImg = (imageSrc, crop) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        resolve(canvas.toDataURL("image/jpeg"));
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onDownloadImage = async () => {
    try {
      const canvas = await html2canvas(imageRef.current);
      const dataURL = canvas.toDataURL("image/jpeg");

      const link = document.createElement("a");
      link.download = "downloaded_image.jpg";
      link.href = dataURL;
      link.click();
    } catch (error) {
      console.error("Error generating downloadable image:", error.message);
    }
  };

  return (
    <div style={{ display: "grid" }}>
      <input type="file" onChange={onSelectFile} />
      {imageSrc && (
        <ReactCrop
          src={imageSrc}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          style={{ border: "1px solid teal", margin: "auto" }}
        >
          <img src={imageSrc} />
        </ReactCrop>
      )}
      {croppedImage && (
        <div style={{ display: "grid", margin: "auto" }}>
          <h2 style={{ textAlign: "center" }}>Preview Image</h2>
          <div style={{ display: "flex", margin: "auto" }}>
            {/* Replace this with the image or content you want to download */}
            <img
              style={{ display: "flex", margin: "auto" }}
              ref={imageRef}
              src={croppedImage}
              alt="Image to download"
            />
          </div>
          <button
            style={{ width: "100%", margin: "auto", marginTop: "15px" }}
            onClick={onDownloadImage}
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCropPreview;
