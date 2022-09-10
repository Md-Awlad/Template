import React from "react";
import logo from "../../image/logo.png";

const Header = () => {
  return (
    <div className="px-4 py-1 flex md:justify-between md:gap-0 gap-1 items-center">
      <img src={logo} alt="" />
      <h2 className="uppercase text-2xl font-bold text-[#FFC446] lg:tracking-[2rem] md:tracking-[1.7rem] tracking-widest">
        digital menu card
      </h2>
    </div>
  );
};

export default Header;
