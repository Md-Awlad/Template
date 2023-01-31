import React from "react";
import mainLogo from "../../../image/Awlad_icon.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <nav className="bg-primary shadow-xl fixed top-0 left-0 right-0">
        <div className="container py-1 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-700">
                <Link to="/">
                  <img
                    className="w-12 h-12 rounded-full"
                    src={mainLogo}
                    alt=""
                  />
                </Link>
              </div>
            </div>

            <div className="flex Items-center">
              <Link
                to="/"
                className="block mx-4 mt-2 text-md text-neutral capitalize lg:mt-0 "
              >
                HOME
              </Link>
              <Link
                to="services"
                className="block mx-4 mt-2 text-md text-neutral capitalize lg:mt-0 "
              >
                SERVICES
              </Link>
              <Link
                to="/login"
                className="block mx-4 mt-2 text-md text-neutral capitalize lg:mt-0 "
              >
                LOGIN
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
