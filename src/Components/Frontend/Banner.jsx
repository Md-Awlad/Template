import React from "react";
import banner from "../../image/Neuvemi_poster.jpg";

const Banner = () => {
  return (
    <div>
      <img
        style={{
          width: "100%",
          height: "30vh",
          backgroundPosition: "center",
          objectFit: "cover",
          backgroundSize: "auto",
          backgroundOrigin: "content-box",
        }}
        src={banner}
        alt="banner"
      />
    </div>
  );
};

export default Banner;
