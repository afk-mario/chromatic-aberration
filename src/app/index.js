import React from "react";

import Header from "components/header";
import Video from "components/video";
import Image from "components/image";

import "modern-css-reset";
import "./style.css";

const App = () => {
  return (
    <div className="app">
      <Header></Header>
      <div className="wrapper">
        <Image src="https://source.unsplash.com/daily" />
        <Image src="/image.jpg" />
        <Video src="/video.webm" />
      </div>
    </div>
  );
};

export default App;
