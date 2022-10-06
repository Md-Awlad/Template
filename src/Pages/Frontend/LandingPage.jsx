import React from "react";
import Menu from "../../Components/Frontend/AllMenu/Menu/Menu";
import Banner from "../../Components/Frontend/Banner";
import Layout from "../../Components/Frontend/Layout/Layout";


const LandingPage = () => {
  return (
    <Layout>
      <Banner />
      <Menu />
    </Layout>
  );
};

export default LandingPage;
