import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import { useStateContext } from "../../Contexts/ContextProvider";
import mainBanner from "../../image/Cover-Banner-17.jpg";
import myAxios, { staticAxios } from "../../utils/myAxios";

const Banner = () => {
  const { activeMenu, restaurantData } = useStateContext();

  const { data: discounts = [] } = useQuery(["discount"], async () => {
    const res = await myAxios("/apply_discount/");
    return res.data;
  });

  // const { data: discounts = [] } = useQuery(["discount"], async () => {
  //   const res = await staticAxios("/apply_discount/");
  //   return res.data;
  // });

  return (
    <>
      {restaurantData?.map((data, index) => (
        <Box key={index} className={`${activeMenu ? "pt-10" : ""} relative  `}>
          <img
            style={{
              width: "100%",
              height: `${activeMenu ? "40vh" : "20vh"}`,
              backgroundPosition: "center",
              objectFit: "cover",
              backgroundSize: "auto",
              backgroundOrigin: "content-box",
            }}
            src={data?.banner || mainBanner}
            alt="banner"
          />
          {Boolean(discounts.length) ? (
            <Marquee
              direction="left"
              gradientColor
              pauseOnHover
              speed={30}
              style={{
                backgroundColor: data?.color || "#F0A70B",
                height: "8vh",
                position: "absolute",
                bottom: 0,
              }}
            >
              {discounts
                .filter((e) => e.is_active)
                ?.map((a) =>
                  a.discount?.map((data, index) => (
                    <Typography
                      key={index}
                      sx={{ mx: 2, fontSize: 22, fontWeight: 600 }}
                    >
                      {data.notice}
                    </Typography>
                  ))
                )}
            </Marquee>
          ) : null}
        </Box>
      ))}
    </>
  );
};

export default Banner;
