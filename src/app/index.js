import React from "react";
import { Helmet } from "react-helmet-async";

import Header from "components/header";
import Video from "components/video";
import Image from "components/image";

import "modern-css-reset";
import "./style.css";

const { REACT_APP_VERSION } = process.env;

console.info("v.", REACT_APP_VERSION);

const App = () => {
  return (
    <div className="app">
      <Helmet title={`NNN ${REACT_APP_VERSION}`} />
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
