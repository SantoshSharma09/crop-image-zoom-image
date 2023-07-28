import React from "react";
import ReactImageMagnify from "react-image-magnify";

export default function ImageMagnify() {
  return (
    <div>
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
    </div>
  );
}
