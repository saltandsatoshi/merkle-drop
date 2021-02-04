import React from "react";
import Spinner from "../../assets/logos/salty-spinner.gif";

import "./style.scss";

const loader = () => {
  return (
    <div className="loader-container">
      <img className="loader-spinner" src={Spinner} alt="" />
    </div>
  );
};

export default loader;
