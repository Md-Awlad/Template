import React, { useEffect, useState } from "react";
import { useStateContext } from "../../Contexts/ContextProvider";
import { useForm } from "react-hook-form";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const BasicInfo = () => {
  const { currentColor } = useStateContext();
  const [countries, setCountries] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => {
          return {
            label: country.name.common,
            value: country.name.common,
            code: country.cca2,
          };
        });
        countries.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countries);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="rounded-br-lg rounded-bl-lg py-5 mx-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-10">
            <div className="font-medium text-xl dark:text-neutral">
              <h2>Basic Information</h2>
            </div>
            {/* --name-- */}
            <Grid item xs={12}>
              <TextField
                id="name"
                label="Name"
                type="text"
                error={Boolean(errors.name)}
                helperText={errors.name && "This name is required *"}
                {...register("name", { required: true })}
                fullWidth
              />
            </Grid>
            {/* --office-- */}
            <Grid item xs={12}>
              <TextField
                id="office"
                label="Office/Company"
                type="text"
                error={Boolean(errors.office)}
                helperText={errors.office && "office is required *"}
                {...register("office", { required: true })}
                fullWidth
              />
            </Grid>
            {/* --address-- */}
            <Grid item xs={12}>
              <TextField
                id="address"
                label="Address"
                type="text"
                error={Boolean(errors.address)}
                helperText={errors.address && "Address is required *"}
                {...register("address", { required: true })}
                fullWidth
              />
            </Grid>
            <div className="grid lg:grid-cols-2 gap-4">
              {/* <--zipCode--> */}
              <Grid item xs={12}>
                <TextField
                  id="branchZipCode"
                  label="Zip Code"
                  type="text"
                  error={Boolean(errors.branchZipCode)}
                  helperText={errors.branchZipCode && " zip code is required *"}
                  {...register("branchZipCode", { required: true })}
                  fullWidth
                />
              </Grid>
              {/* --country-- */}
              <Autocomplete
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 }, my: "5px" }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    id="country"
                    label="Branch Country"
                    error={Boolean(errors.country)}
                    helperText={errors.country && "country is required *"}
                    {...register("country", { required: true })}
                    inputProps={{
                      ...params.inputProps,
                    }}
                    fullWidth
                  />
                )}
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {/* --number-- */}
              <Grid item xs={12}>
                <TextField
                  id="number"
                  label="Mobile Number"
                  type="number"
                  error={Boolean(errors.number)}
                  helperText={errors.number && "Number is required *"}
                  {...register("number", { required: true })}
                  fullWidth
                />
              </Grid>
              {/* --nid-- */}
              <Grid item xs={12}>
                <TextField
                  id="nid"
                  label="National NID Number"
                  type="number"
                  error={Boolean(errors.nid)}
                  helperText={errors.nid && "NID number is required *"}
                  {...register("nid", { required: true })}
                  fullWidth
                />
              </Grid>
            </div>
          </div>
          <div className="flex justify-end mt-16">
            <Link
              to="/otp"
              style={{ backgroundColor: currentColor }}
              type="submit"
              className="rounded-md shadow md:mx-4 mx-2 px-8 py-2 text-sm font-medium text-white outline-none"
            >
              Update
            </Link>
            <button
              type="submit"
              className="rounded-md shadow px-8 py-2 text-sm font-medium bg-[#f13f3f] text-white outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
