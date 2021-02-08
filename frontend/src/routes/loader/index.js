import React from "react";
import Spinner from "../../assets/logos/salty-spinner.svg";

import "./style.scss";

const loader = () => {
  return (
    <div className="loader-container">
      {/* <img className="loader-spinner" src={Spinner} alt=""  width="300" height="300"/> */}
      <div 
        className="loader-spinner"
        style={{
          height: '300px',
          width: '300px',
          display: 'flex'
        }}
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="${300}" height="${300}" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <g transform="translate(50 50)">
            <g transform="scale(0.26)">
              <g transform="translate(-50 -50)">
                <g>
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="0.7575757575757576s"></animateTransform>
                  <path fill-opacity="0.8" fill="#f72585" d="M50 50L50 0A50 50 0 0 1 100 50Z"></path>
                </g>
                <g>
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.0101010101010102s"></animateTransform>
                  <path fill-opacity="0.8" fill="#7209b7" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(90 50 50)"></path>
                </g>
                <g>
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5151515151515151s"></animateTransform>
                  <path fill-opacity="0.8" fill="#3a0ca3" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(180 50 50)"></path>
                </g>
                <g>
                  <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" values="0 50 50;360 50 50" keyTimes="0;1" dur="3.0303030303030303s"></animateTransform>
                  <path fill-opacity="0.8" fill="#4361ee" d="M50 50L50 0A50 50 0 0 1 100 50Z" transform="rotate(270 50 50)"></path>
                </g>
              </g>
            </g>
          </g>
          </svg>`
        }}
      />)
    </div>
  );
};

export default loader;
