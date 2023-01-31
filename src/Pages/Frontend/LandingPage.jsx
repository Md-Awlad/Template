import React, { lazy } from "react";
import Banner from "../../Components/Frontend/Banner";
import { SuspenseLoader } from "../../Components/Shared/SharedStyles";
const Layouts = lazy(() => import("../../Components/Frontend/Layouts/Layouts"));

const LandingPage = () => {
  return (
    <Layouts>
      <SuspenseLoader>
        <Banner />
      </SuspenseLoader>
    </Layouts>
  );
};

export default LandingPage;
