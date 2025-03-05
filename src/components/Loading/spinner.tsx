import React from "react";
import "../../styles/loading.css";

const SpinnerLoading = () => (
  <div className="overlay">
    <div className="spinner">
      <div className="blob top" />
      <div className="blob bottom" />
      <div className="blob left" />
      <div className="blob move-blob" />
    </div>
  </div>
);

export default SpinnerLoading;
