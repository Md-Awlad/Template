import React, { lazy } from "react";
const Menu = lazy(() => import("../../Components/Frontend/AllMenu/Menu/Menu"));

const Layout = lazy(() => import("../../Components/Frontend/Layout/Layout"));
const Banner = lazy(() => import("../../Components/Frontend/Banner"));
const LandingPage = () => {
  return (
    <Layout>
      <Banner />
      <Menu />
    </Layout>
  );
};

export default LandingPage;
