import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Marquee from "react-fast-marquee";
import banner from "../../image/Neuvemi_poster.jpg";
import { staticAxios } from "../../utils/myAxios";

const Banner = () => {
  const { data: discounts = [] } = useQuery(["discount"], async () => {
    const res = await staticAxios("/apply_discount/");
    return res.data;
  });

  return (
    <Box>
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
      <Marquee
        direction="left"
        gradientColor
        pauseOnHover
        speed={60}
        style={{ backgroundColor: "#FFC446", height: "8vh" }}
      >
        {discounts
          .filter((e) => e.is_active)
          ?.map((a) =>
            a.discount?.map((data) => (
              <Typography sx={{ mx: 2, fontSize: 22, fontWeight: 600 }}>
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
            style={{ backgroundColor: "#FFC446", height: "8vh" }}
          >
            <Typography>{notice.notice}</Typography>
          </Marquee>
        </Box>
      ))} */}
    </Box>
  );
};

export default Banner;
