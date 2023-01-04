import { Box } from "@mui/material";
import { DataGridPro, GridToolbar } from "@mui/x-data-grid-pro";
import React, { useEffect, useState } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { LoadingSkeleton } from "./SharedStyles";

const CustomDataGrid = ({
  rows = [],
  columns = [],
  columnVisibilityModel = {},
  setColumnVisibilityModel,
  loading = false,
  rowModesModel = {},
  newEditingApi = false,
  getRowId,
  handleRowEditStart,
  handleRowEditStop,
  processRowUpdate,
  allowExport = false,
  print = true,
  csv = true,
  setHight = null,
  setPagination = true,
  component = true,
  showQuickFilter = true,
  hideFooter = false,
  leftPinning = [],
  rightPinning = [],
}) => {
  const [pageSize, setPageSize] = useState(7);
  const [density, setDensity] = useState("standard");
  const [containerHeight, setContainerHeight] = useState(350);
  const { currentMode, currentColor } = useStateContext();
  useEffect(() => {
    const interval = setInterval(() => {
      const hideNode = document.evaluate(
        "//div[text()='MUI X: Missing license key']",
        document,
        null,
        XPathResult.ANY_TYPE,
        null
      );
      while (true) {
        const hide = hideNode.iterateNext();
        if (hide) {
          hide.style.display = "none";
        } else {
          clearInterval(interval);
          break;
        }
      }
    }, 10);
  }, [rows]);

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
      sx={{
        height: setHight || containerHeight,
        width: 1,
      }}
    >
      <DataGridPro
        sx={{
          color: currentMode === "Dark" ? "#fff" : "#000",
          "& .MuiIconButton-root": {
            color: "unset !important",
          },
          "& .MuiTablePagination-toolbar": {
            color: currentMode === "Dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: currentMode === "Dark" ? `${currentColor}10` : "",
          },
          "& .MuiDataGrid-selectedRowCount": {
            visibility: "hidden",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiInput-root": {
            color: currentMode === "Dark" ? "#fff" : "#000",
          },
        }}
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(newModel) => {
          return setColumnVisibilityModel(newModel);
        }}
        loading={loading}
        pagination={setPagination}
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
        disableColumnFilter
        hideFooter={hideFooter}
        components={{
          Toolbar: component && GridToolbar,
          LoadingOverlay: LoadingSkeleton,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: showQuickFilter,
            printOptions: {
              disableToolbarButton: allowExport && print ? false : true,
            },
            csvOptions: {
              disableToolbarButton: allowExport && csv ? false : true,
            },
          },
        }}
        initialState={{
          pinnedColumns: { left: leftPinning, right: rightPinning },
        }}
      />
    </Box>
  );
};

export default CustomDataGrid;
