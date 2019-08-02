import React from "react";
import { Image } from "semantic-ui-react";

function Footer(props) {
  return (
    <footer>
      <div className="footer">
        {/* <div> */}
        <div className="logo">
          <Image
            className="logo__img"
            alt="betterreads logo"
            src={require("../imgs/br-logo.png")}
          />
        </div>
        {/* </div> */}

        <div className="nav-links">
          <p className="copyright">&copy;2019</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
