import React from "react";
import { TailSpin } from "react-loader-spinner";
import "../Styles/Loader.css";

function Loader() {
  return (
    <div className="spinner-loading">
      <TailSpin color="#4fa94d" height={80} width={80} />
    </div>
  );
}

export default Loader;