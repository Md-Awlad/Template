import { Box, Container, Modal, Tab, Tabs, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import ApplyDiscountList from "../../Components/Admin/Discount/ApplyDiscountList";
import DiscountList from "../../Components/Admin/Discount/DiscountList";
import AddDiscount from "../../Components/Modals/Admin/AddDiscount";
import ApplyDiscount from "../../Components/Modals/Admin/ApplyDiscount";
import PageTitle from "../../Components/PageTitle/PageTitle";
import { useStateContext } from "../../Contexts/ContextProvider";
import myAxios from "../../utils/myAxios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Discount = () => {
  const { currentColor, currentMode } = useStateContext();
  const [openModal, setOpenModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  const handleDiscountModalOpen = (e) => {
    setDiscountModal(true);
  };
  const handleDiscountModalClose = (e) => {
    setDiscountModal(false);
  };

  const { data: discounts = [], refetch: discountRefetch } = useQuery(
    ["discount"],
    async () => {
      const res = await myAxios("/create_discount/");
      return res.data;
    }
  );

  const {
    data: applyDiscount = [],
    refetch: applyRefetch,
    isError,
    isLoading,
  } = useQuery(["applyDiscounts"], async () => {
    const res = await myAxios("/apply_discount/");
    return res.data;
  });

  const { data: categories = [] } = useQuery(["category"], async () => {
    const res = await myAxios("/category/");
    return res.data;
  });

  const { data: foods = [] } = useQuery(["food"], async () => {
    const res = await myAxios("/food/");
    return res.data;
  });

  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddDiscount
          discountRefetch={discountRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <Modal open={discountModal} onClose={handleDiscountModalClose}>
        <ApplyDiscount
          discounts={discounts}
          categories={categories}
          foods={foods}
          handleDiscountModalClose={handleDiscountModalClose}
        />
      </Modal>
      <PageTitle
        headingText="discount"
        pageName="discount"
        buttonText="Add Discount"
        buttonTextTwo="Apply Discount"
        modalOpen={handleModalOpen}
        modalOpenTwo={handleDiscountModalOpen}
      />

      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            "& button": {
              borderRadius: "5px 5px 0 0 ",
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
            "& button.Mui-selected": {
              backgroundColor: `${currentColor}`,
              color: "white",
              "&:hover": {
                backgroundColor: `${currentColor}`,
                color: "white",
              },
            },
            "& button:hover": {
              backgroundColor: `${
                currentMode === "Light" ? "#fff" : "#33373E"
              }`,
              color: `${currentMode === "Light" ? "#000" : "#fff"}`,
            },
          }}
        >
          <Tab label="Discount Information" {...a11yProps(0)} />
          <Tab label="Apply Discount" {...a11yProps(1)} />
        </Tabs>
        {/* --dineIn-- */}
        <TabPanel value={value} index={0}>
          <DiscountList
            discounts={discounts}
            handleModalClose={handleModalClose}
            isLoading={isLoading}
            isError={isError}
          />
        </TabPanel>
        {/* --takeaway-- */}
        <TabPanel value={value} index={1}>
          <ApplyDiscountList
            applyDiscount={applyDiscount}
            discounts={discounts}
            applyRefetch={applyRefetch}
            categories={categories}
            foods={foods}
            isLoading={isLoading}
            isError={isError}
          />
        </TabPanel>
      </Box>
    </Container>
  );
};

export default Discount;
