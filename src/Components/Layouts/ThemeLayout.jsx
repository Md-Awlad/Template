import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import { useStateContext } from "../../Contexts/ContextProvider";

const ThemeLayout = ({ children }) => {
  const { currentColor, currentMode } = useStateContext();
  const darkMode = currentMode === "Dark";

  const theme = createTheme({
    palette: {
      primary: {
        main: currentColor,
      },
    },
    typography: {
      // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 42,
      },
      h2: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 34,
      },
      h3: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 26,
      },
      h4: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 22,
      },
      h5: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 18,
      },
      h6: {
        // fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
    },
    // typography: {
    //   fontFamily: ["Open Sans", "sans-serif"].join(","),
    // },
    components: {
      MuiButton: {
        styleOverrides: {
          contained: {
            color: "white",
          },
          root: {
            textTransform: "none",
          },
          outlined: {
            color: darkMode && "unset",
            borderColor: darkMode && "unset",
            "&:hover": {
              borderColor: darkMode && "unset",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            "& svg": {
              color: darkMode ? "#fff" : "#000",
            },
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: darkMode && "unset",
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            "& .MuiSvgIcon-root": {
              color: darkMode && "#fff",
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: darkMode && "unset",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "& .MuiListItemText-secondary": {
              color: darkMode && "unset",
              fontSize: 12,
              paddingTop: 1,
            },
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          root: {
            "& .MuiStepLabel-label.Mui-active": {
              color: darkMode ? "#fff" : "#000",
            },
            "& .MuiStepLabel-label": {
              color: "#707070",
            },
            "& .MuiStepIcon-root": {
              color: darkMode && "#fff",
            },
            "& .MuiTypography-caption": {
              color: darkMode && "#707070",
            },
            "& .Mui-completed": {
              color: darkMode && "#707070 !important",
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: darkMode && "#fff",
          },
        },
      },
      MuiDialogContentText: {
        styleOverrides: {
          root: {
            color: darkMode && "unset",
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            "& .MuiChip-label": {
              color: darkMode && "#fff",
            },
            "& .MuiChip-deleteIcon": {
              color: darkMode && "#fff !important",
              "&:hover": {
                color: darkMode && "#fff !important",
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: darkMode && "#fff",
            "& svg": {
              color: "#aaa",
            },
            "& fieldset": {
              borderColor: darkMode && "#fff",
            },
            "&:hover fieldset": {
              borderColor: "unset !important",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: darkMode && "#fff",
              bgcolor: darkMode && "#fff",
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            "& .MuiSlider-markLabel": {
              color: darkMode ? "#fff" : "#000",
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            color: "unset",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "#707070",
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              color: "unset",
            },
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            "& svg": {
              color: darkMode ? "#fff" : "#666",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: "unset",
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            color: darkMode && "unset",
            "& .MuiDataGrid-toolbarContainer": {
              paddingTop: "10px",
            },
            "& .MuiInput-root": {
              "& fieldset": {
                borderColor: "#fff",
              },
            },
            "& .MuiIconButton-root,.MuiInputBase-root,.MuiButton-root": {
              color: "unset !important",
            },
            "& .MuiSelect-select": {
              color: darkMode && "#fff",
            },
            "& .MuiDataGrid-row--editing": {
              color: "#000",
            },
            "& .MuiDataGrid-pinnedColumns, .MuiDataGrid-pinnedColumnHeaders": {
              backgroundColor: darkMode && "#33373f",
              color: darkMode && "#fff",
            },
            "& .MuiDataGrid-actionsCell": {
              gridGap: 0,
            },
            "& .MuiCheckbox-root": {
              "& svg": {
                color: darkMode ? "#fff" : "#666",
              },
            },
            "& .MuiDataGrid-renderingZone": {
              maxHeight: "none !important",
            },
            "& .MuiDataGrid-cell": {
              lineHeight: "unset !important",
              maxHeight: "none !important",
              whiteSpace: "normal",
            },
            "& .MuiDataGrid-row": {
              maxHeight: "none !important",
            },
          },
        },
      },
      MuiTablePagination: {
        styleOverrides: {
          root: {
            "& p,svg": {
              color: currentMode === "Dark" ? "#fff" : "#000",
            },
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            maxWidth: "unset !important",
          },
        },
      },
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeLayout;
