import React, { useState, useCallback, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import html2canvas from "html2canvas";
import download from "downloadjs";
import { useEffect } from "react";

export const ImageCropPreviewDownload = () => {
  const [upImg, setUpImg] = useState();
  const [crop, setCrop] = useState({ aspect: 1 / 1 }); // You can change the aspect ratio as per your requirement
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const imgRef = useRef(null);

  const onImageLoaded = (image) => {
    // When the image is loaded, you can set it up for cropping
    imgRef.current = image;
  };

  const onCropComplete = () => {
    // You can do something with the cropped image here if needed
    console.log(crop);
    generateCropPreview();
  };

  useEffect(() => {
    onCropComplete();
  }, []);

  const generateCropPreview = () => {
    if (imgRef.current && crop.width && crop.height) {
      html2canvas(imgRef.current, {
        width: crop.width,
        height: crop.height,
        x: crop.x,
        y: crop.y,
      }).then((canvas) => {
        // Convert the canvas to a data URL and set it for preview
        const croppedImageURL = canvas.toDataURL();
        setCroppedImageUrl(canvas.toDataURL());
      });
    }
  };

  const downloadCroppedImage = () => {
    if (croppedImageUrl) {
      // Use the downloadjs library to download the cropped image
      download(croppedImageUrl, "croppedImage.png");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener("load", () => setUpImg(reader.result));
            reader.readAsDataURL(e.target.files[0]);
          }
        }}
      />
      <div>
        {upImg && (
          <>
            <ReactCrop
              src={upImg}
              crop={crop}
              onChange={setCrop}
              onComplete={onCropComplete}
              onImageLoaded={onImageLoaded}
              style={{ width: "800px", height: "800px" }}
            />
            {croppedImageUrl && (
              <div>
                <h2>Cropped Image Preview</h2>
                <img src={croppedImageUrl} alt="Cropped Preview" />
                <div style={{ marginBottom: "50px" }}>
                  <button onClick={downloadCroppedImage}>
                    Download Cropped Image
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
