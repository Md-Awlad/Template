import { Box } from "@mui/material";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import React, { useEffect, useState } from "react";
import { LoadingSkeleton } from "./SharedStyles";

const CustomDataGrid = ({
  rows = [],
  columns = [],
  loading = false,
  rowModesModel = {},
  newEditingApi = false,
  getRowId,
  handleRowEditStart,
  handleRowEditStop,
  processRowUpdate,
  allowExport = false,
}) => {
  const [pageSize, setPageSize] = useState(7);
  const [density, setDensity] = useState("standard");
  const [containerHeight, setContainerHeight] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      const hideNode = document.evaluate(
        "//div[text()='MUI X: Missing license key']",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (hideNode) {
        hideNode.style.display = "none";
        clearInterval(interval);
      }
    }, 10);
  }, []);

  const handleStateChange = (event) => {
    if (density !== event.density) {
      setDensity(event.density);
      switch (event.density.value) {
        case "compact":
          setContainerHeight(512);
          setPageSize(10);
          break;

        case "comfortable":
          setContainerHeight(520);
          setPageSize(5);
          break;

        default:
          setContainerHeight(530);
          setPageSize(7);
          break;
      }
    }
  };

  return (
    <Box
      className="dark:text-neutral"
      sx={{ height: containerHeight, width: "100%" }}
    >
      <DataGridPro
        rows={rows}
        columns={columns}
        loading={loading}
        pagination={true}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 7, 10, 20, 35, 50, 70, 100, 200]}
        getRowId={getRowId}
        editMode="row"
        rowModesModel={rowModesModel}
        experimentalFeatures={{ newEditingApi }}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={() => null}
        onStateChange={handleStateChange}
        disableSelectionOnClick
        // hideFooter={rows?.length < pageSize + 1}
        components={{ Toolbar: GridToolbar, LoadingOverlay: LoadingSkeleton }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            printOptions: {
              disableToolbarButton: allowExport ? false : true,
            },
            csvOptions: {
              disableToolbarButton: allowExport ? false : true,
            },
          },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
