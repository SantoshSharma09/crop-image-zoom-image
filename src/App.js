import React from "react";
import "react-image-crop/dist/ReactCrop.css";

import ImageCropPreview from "./component/ImageCrop";

function App() {
  return (
    <div className="App">
     
      <h1>Crop Image</h1>
      <div>
        <ImageCropPreview />
      </div>
    </div>
  );
}

export default App;
