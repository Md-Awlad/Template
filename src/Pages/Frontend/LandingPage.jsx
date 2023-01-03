import React, { lazy } from "react";
import { SuspenseLoader } from "../../Components/Shared/SharedStyles";
const Menu = lazy(() => import("../../Components/Frontend/AllMenu/Menu/Menu"));

const Layout = lazy(() => import("../../Components/Frontend/Layout/Layout"));
const Banner = lazy(() => import("../../Components/Frontend/Banner"));
const LandingPage = () => {
  return (
    <Layout>
      <SuspenseLoader>
        <Banner />
        <Menu />
      </SuspenseLoader>
    </Layout>
  );
};

export default LandingPage;
