import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import { useStateContext } from "../../Contexts/ContextProvider";
import banner from "../../image/Cover-Banner-17.jpg";
import { staticAxios } from "../../utils/myAxios";

const Banner = () => {
  const { activeMenu } = useStateContext();
  const { data: discounts = [] } = useQuery(["discount"], async () => {
    const res = await staticAxios("/apply_discount/");
    return res.data;
  });

  return (
    <Box className={`${activeMenu ? "pt-10" : ""}`}>
      <img
        style={{
          width: "100%",
          height: `${activeMenu ? "30vh" : "10vh"}`,
          backgroundPosition: "center",
          objectFit: "cover",
          backgroundSize: "auto",
          backgroundOrigin: "content-box",
        }}
        src={banner}
        alt="banner"
      />
      <Marquee
        direction="left"
        gradientColor
        pauseOnHover
        speed={30}
        style={{ backgroundColor: "#F0A70B", height: "8vh" }}
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
      {/* {discounts?.map((notice) => (
        <Box key={notice.id}>
          <Marquee
            direction="left"
            gradientColor
            pauseOnHover
            Speed="80px"
            style={{ backgroundColor: "#F0A70B", height: "8vh" }}
          >
            <Typography>{notice.notice}</Typography>
          </Marquee>
        </Box>
      ))} */}
    </Box>
  );
};

export default Banner;
