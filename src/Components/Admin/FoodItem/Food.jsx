import { Box, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteFood from "../../Modals/Admin/DeleteFood";
import EditFood from "../../Modals/Admin/EditFood";
import CustomDataGrid from "../../Shared/CustomDataGrid";
import { CustomModal } from "../../Shared/SharedStyles";

const Food = ({ category, customizeFood }) => {
  const [editFood, setEditFood] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const food = category?.foodItems_category?.map((a) => a);

  const columns = [
    {
      field: "id",
      headerName: "Id",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div>
            <img
              className="w-14 h-14 object-contain"
              src={params?.row?.image}
              alt=""
            />
          </div>
        );
      },
    },
    {
      field: "food_name",
      headerName: "Food Name",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Size & Price",
      width: 230,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        return (
          <Tooltip
            title={
              Object.entries(value).length
                ? Object.keys(value).map((key, index) => {
                    return (
                      <div key={index} className="flex gap-5">
                        <h2>size: {key}</h2>
                        <h2>Price: {value[key]}</h2>
                      </div>
                    );
                  })
                : "no data"
            }
            placement="top"
          >
            <div className="overflow-y-auto h-12 w-full">
              {Object.entries(value).length
                ? Object.keys(value).map((key, index) => {
                    return (
                      <div key={index} className="flex gap-5">
                        <h2>size: {key}</h2>
                        <h2>Price: {value[key]}</h2>
                      </div>
                    );
                  })
                : "no data"}
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: "custom_food",
      headerName: "Extra & Price",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Tooltip
            title={row?.customize_food?.map((data) => (
              <div key={data?.id} className="flex gap-5">
                <h2>Name: {data?.name}</h2>
                <h2>Price: {data?.price}</h2>
              </div>
            ))}
            placement="top"
          >
            <div className="overflow-y-auto h-12 w-full">
              {row?.customize_food?.map((data) => {
                return (
                  <div key={data?.id} className="flex gap-5">
                    <h2>Name: {data?.ingredient_name}</h2>
                    <h2>Price: {data?.price}</h2>
                  </div>
                );
              })}
            </div>
          </Tooltip>
        );
      },
    },
    {
      field: "discount_price",
      headerName: "Discount Price",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => {
        if (value) {
          return (
            <Tooltip
              title={Object.keys(value)?.map((key, index) => (
                <div key={index} className="flex justify-between w-36">
                  <h2>size: {key}</h2>
                  <h2>Price: {value[key]}</h2>
                </div>
              ))}
              placement="top"
            >
              <div className="overflow-y-auto h-12 w-full mt-7">
                {Object.keys(value)?.map((key, index) => (
                  <div key={index} className="grid grid-cols-2">
                    <h2>size: {key}</h2>
                    <h2>Price: {value[key]}</h2>
                  </div>
                ))}
              </div>
            </Tooltip>
          );
        } else {
          return (
            <div className="grid grid-cols-2">
              <h2>0</h2>
            </div>
          );
        }
      },
    },
    {
      field: "review",
      headerName: "Review",
      headerAlign: "center",
      align: "center",
      width: 80,
    },
    {
      field: "is_recommended",
      headerName: "Recommended",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params?.value === true
                ? "bg-green-200 text-green-900"
                : "bg-yellow-200 text-yellow-700"
            } px-5 rounded-md font-medium   `}
          >
            <p>{params?.value === true ? "true" : "false"}</p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box className="flex gap-5 items-center">
            <Tooltip title="Edit Food" placement="top">
              <MdModeEdit
                onClick={() => setEditFood(row)}
                className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
            <Tooltip title="Delete Food" placement="top">
              <RiDeleteBin6Line
                onClick={() => setDeleteId(row?.id)}
                className="text-red-400 dark:text-neutral text-xl cursor-pointer"
              />
            </Tooltip>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <CustomDataGrid
        rows={food}
        columns={columns}
        leftPinning={["id"]}
        rightPinning={["action"]}
      />

      {Boolean(Object.entries(editFood).length) ? (
        <CustomModal
          open={Boolean(Object.entries(editFood).length)}
          onClose={() => setEditFood({})}
        >
          <EditFood
            allFoodData={editFood}
            handleModalClose={() => setEditFood({})}
            categories={food}
            customizeFood={customizeFood}
          />
        </CustomModal>
      ) : null}
      {Boolean(deleteId) && (
        <DeleteFood deleteId={deleteId} handleClose={() => setDeleteId(null)} />
      )}
    </>
  );
};

export default Food;
