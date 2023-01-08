import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import { useStateContext } from "../../Contexts/ContextProvider";
import { staticAxios } from "../../utils/myAxios";

const Banner = () => {
  const { expandedMenu, restaurantData } = useStateContext();

  const { data: discounts = [] } = useQuery(["discount"], async () => {
    const res = await staticAxios("/apply_discount/");
    return res.data;
  });

  return (
    <>
      <Box>
        <img
          style={{
            width: "100%",
            height: `${expandedMenu ? "40vh" : "20vh"}`,
            backgroundPosition: "center",
            objectFit: "cover",
            backgroundSize: "auto",
            backgroundOrigin: "content-box",
          }}
          src={
            restaurantData?.banner ||
            "https://i.ibb.co/L1v4dJD/resturant-Defalut-Banner.jpg"
          }
          alt="banner"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src =
              "https://i.ibb.co/L1v4dJD/resturant-Defalut-Banner.jpg";
          }}
        />

        {Boolean(discounts.length) ? (
          <Marquee
            direction="left"
            gradientColor
            pauseOnHover
            speed={30}
            // className="sticky top-0 left-0 right-0 z-10"
            style={{
              backgroundColor: restaurantData?.color || "#F0A70B",
              height: "3rem",
              position: "sticky",
              top: 0,
              // right: 0,
              // left: 0,
              // zIndex: 10,
            }}
          >
            {discounts
              .filter((e) => e.is_active)
              ?.map((a) =>
                a.discount?.map((data, index) => (
                  <Typography
                    component="span"
                    key={index}
                    variant="h6"
                    sx={{ mx: 2, fontSize: 22, fontWeight: 500 }}
                  >
                    {data.notice}
                  </Typography>
                ))
              )}
          </Marquee>
        ) : null}
      </Box>
    </>
  );
};

export default Banner;
