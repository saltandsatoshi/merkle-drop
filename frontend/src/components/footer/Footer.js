import { Component } from "react";
import Logo from "../../assets/logos/salty-plain.png";
import { medias } from "./medias";
import "./style.scss";

class Footer extends Component {
  render() {
    return (
      <div className="footer-bar">
        <div className="footer-container">
          <div className="upper">
            <div className="navigation">
              <div className="item">
                <div className="header">Applications</div>
                <a href="https://saltandsatoshi.com/">Home</a>
              </div>
              <div className="item">
                <div className="header">Social</div>
                <a href="https://discord.gg/D4T9PMK9F9">Discord</a>
                <a href="https://twitter.com/saltandsatoshi">Twitter</a>
              </div>
              <div className="item">
                <div className="header">Resources</div>
                <a href="https://saltandsatoshi.com/#blog">Blog</a>
              </div>
            </div>
            <div className="media">
              <div className="header">Find us</div>
              <div className="items">
                {medias.map((m) => (
                  <a
                    key={m[1]}
                    href={m[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={m[0]} alt={m[1]} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="bottom">
            <a href="http://saltandsatoshi.com/">
              <img src={Logo} alt="" className="logo" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
