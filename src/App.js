import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactImageMagnify from "react-image-magnify";
import ImageCropPreview from "./component/ImageCrop";

function App() {
  return (
    <div className="App">
      <h1>Magnifying the image</h1>
      <div style={{ width: "342px", height: "513" }}>
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Wristwatch by Ted Baker London",
              isFluidWidth: true,
              src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
            },
            largeImage: {
              src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
              width: 800,
              height: 800,
            },
          }}
        />
      </div>
      <h1>Crop Image</h1>
      <div>
        <ImageCropPreview />
      </div>
    </div>
  );
}

export default App;
