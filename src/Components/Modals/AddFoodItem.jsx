import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Autocomplete, Button, Grid, InputAdornment } from "@mui/material";
import myAxios from "../../utils/myAxios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
//   { title: "Schindler's List", year: 1993 },
//   { title: "Pulp Fiction", year: 1994 },
//   { title: "The Lord of the Rings: The Return of the King", year: 2003 },
//   { title: "The Good, the Bad and the Ugly", year: 1966 },
//   { title: "Fight Club", year: 1999 },
//   { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
//   { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
//   { title: "Forrest Gump", year: 1994 },
//   { title: "Inception", year: 2010 },
//   { title: "The Lord of the Rings: The Two Towers", year: 2002 },
//   { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   { title: "Goodfellas", year: 1990 },
//   { title: "The Matrix", year: 1999 },
//   { title: "Seven Samurai", year: 1954 },
//   { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
//   { title: "City of God", year: 2002 },
//   { title: "Se7en", year: 1995 },
//   { title: "The Silence of the Lambs", year: 1991 },
//   { title: "It's a Wonderful Life", year: 1946 },
//   { title: "Life Is Beautiful", year: 1997 },
//   { title: "The Usual Suspects", year: 1995 },
//   { title: "Léon: The Professional", year: 1994 },
//   { title: "Spirited Away", year: 2001 },
//   { title: "Saving Private Ryan", year: 1998 },
//   { title: "Once Upon a Time in the West", year: 1968 },
//   { title: "American History X", year: 1998 },
//   { title: "Interstellar", year: 2014 },
//   { title: "Casablanca", year: 1942 },
//   { title: "City Lights", year: 1931 },
//   { title: "Psycho", year: 1960 },
//   { title: "The Green Mile", year: 1999 },
//   { title: "The Intouchables", year: 2011 },
//   { title: "Modern Times", year: 1936 },
//   { title: "Raiders of the Lost Ark", year: 1981 },
//   { title: "Rear Window", year: 1954 },
//   { title: "The Pianist", year: 2002 },
//   { title: "The Departed", year: 2006 },
//   { title: "Terminator 2: Judgment Day", year: 1991 },
//   { title: "Back to the Future", year: 1985 },
//   { title: "Whiplash", year: 2014 },
//   { title: "Gladiator", year: 2000 },
//   { title: "Memento", year: 2000 },
//   { title: "The Prestige", year: 2006 },
//   { title: "The Lion King", year: 1994 },
//   { title: "Apocalypse Now", year: 1979 },
//   { title: "Alien", year: 1979 },
//   { title: "Sunset Boulevard", year: 1950 },
//   {
//     title:
//       "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
//     year: 1964,
//   },
//   { title: "The Great Dictator", year: 1940 },
//   { title: "Cinema Paradiso", year: 1988 },
//   { title: "The Lives of Others", year: 2006 },
//   { title: "Grave of the Fireflies", year: 1988 },
//   { title: "Paths of Glory", year: 1957 },
//   { title: "Django Unchained", year: 2012 },
//   { title: "The Shining", year: 1980 },
//   { title: "WALL·E", year: 2008 },
//   { title: "American Beauty", year: 1999 },
//   { title: "The Dark Knight Rises", year: 2012 },
//   { title: "Princess Mononoke", year: 1997 },
//   { title: "Aliens", year: 1986 },
//   { title: "Oldboy", year: 2003 },
//   { title: "Once Upon a Time in America", year: 1984 },
//   { title: "Witness for the Prosecution", year: 1957 },
//   { title: "Das Boot", year: 1981 },
//   { title: "Citizen Kane", year: 1941 },
//   { title: "North by Northwest", year: 1959 },
//   { title: "Vertigo", year: 1958 },
//   { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
//   { title: "Reservoir Dogs", year: 1992 },
//   { title: "Braveheart", year: 1995 },
//   { title: "M", year: 1931 },
//   { title: "Requiem for a Dream", year: 2000 },
//   { title: "Amélie", year: 2001 },
//   { title: "A Clockwork Orange", year: 1971 },
//   { title: "Like Stars on Earth", year: 2007 },
//   { title: "Taxi Driver", year: 1976 },
//   { title: "Lawrence of Arabia", year: 1962 },
//   { title: "Double Indemnity", year: 1944 },
//   { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
//   { title: "Amadeus", year: 1984 },
//   { title: "To Kill a Mockingbird", year: 1962 },
//   { title: "Toy Story 3", year: 2010 },
//   { title: "Logan", year: 2017 },
//   { title: "Full Metal Jacket", year: 1987 },
//   { title: "Dangal", year: 2016 },
//   { title: "The Sting", year: 1973 },
//   { title: "2001: A Space Odyssey", year: 1968 },
//   { title: "Singin' in the Rain", year: 1952 },
//   { title: "Toy Story", year: 1995 },
//   { title: "Bicycle Thieves", year: 1948 },
//   { title: "The Kid", year: 1921 },
//   { title: "Inglourious Basterds", year: 2009 },
//   { title: "Snatch", year: 2000 },
//   { title: "3 Idiots", year: 2009 },
//   { title: "Monty Python and the Holy Grail", year: 1975 },
// ];

const AddFoodItem = ({ handleModalCloseTwo, categories }) => {
  const topFilms = [
    { size: "6''" },
    { size: "9''" },
    { size: "12''" },
    { size: "large" },
    { size: "small" },
    { size: "1:3" },
    { size: "1:4" },
  ];

  const { currentColor, currentMode } = useStateContext();
  const [selectValue, setSelectValue] = useState([]);
  const [variants, setVariants] = useState(0);
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState();

  // const [price2, setPrice2] = useState([top100Films[13]]);
  // console.log(price);
  // console.log(categories);
  // let arr = [];
  // arr.push(price);
  // console.log(arr);
  // const handleKeyDown = (event) => {
  //   switch (event.key) {
  //     case ",":
  //     case " ": {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       if (event.target.value.length > 0) {
  //         setPrice([...price, event.target.value]);
  //       }
  //       break;
  //     }
  //     default:
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    const price = {};

    data.item?.forEach(item=>{
      price[item.title] = item.price;
    })

    console.log(price);

    const payloadForm = new FormData();
    payloadForm.append("food_name", data?.food_name);
    payloadForm.append("image", data?.image[0]);
    payloadForm.append("price", price);
    payloadForm.append("review", data?.review);
    payloadForm.append("is_recommended", data?.is_recommended);
    payloadForm.append("base_ingredient", data?.base_ingredient);
    payloadForm.append("taste", data?.taste);
    payloadForm.append("packaging", data?.packaging);
    payloadForm.append("category", category);

    for (let value of payloadForm) {
      console.log(value);
    }

    const response = await toast.promise(
      myAxios.post("/food/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Foods...",
        success: "Food Added",
        error: "Error Adding Foods!",
      }
    );
    if (response.status === 500) {
      handleModalCloseTwo();
    }

    // console.log(payloadForm);
  };
  // const ct = categ?.map((c) => c?.map((cc) => cc.id));

  return (
    <Box sx={{ ...style, width: 600, height: 500, overflowY: "scroll" }}>
      <h2 className="text-xl font-bold pb-3 text-center">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          {/* --FoodName-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="food_name"
              label="Food Name"
              type="text"
              error={Boolean(errors.food_name)}
              helperText={errors.food_name && "This food name is required *"}
              {...register("food_name", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --size-- */}
          <Grid item xs={12}>
            {/* <Autocomplete
              multiple
              options={topFilms.map((option) => option.size)}
              defaultValue={[topFilms[2].size]}
              filterSelectedOptions
              value={selectValue}
              onChange={(event, value) => setSelectValue(value)}
              renderInput={(params) => (
                <TextField {...params} label="Price Title" />
              )}
            /> */}
                  <Button
                    variant="contained"
                    onClick={() => setVariants((variants) => (variants += 1))}
                  >
                    +
                  </Button>
            {new Array(variants).fill(null).map((item, index) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <TextField {...register(`item.${index+1}.title`)} />
                  <TextField {...register(`item.${index+1}.price`)} />
                </Box>
              );
            })}
          </Grid>
          {/* --price-- */}
          {/* <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="food_price"
              label="Price"
              type="text"
              value={price}
              onChange={(value) => setPrice(value)}
              error={Boolean(errors.food_price)}
              helperText={errors.food_price && "This food price is required *"}
              {...register("food_price", { required: true })}
              fullWidth
            />
            <Autocomplete
              multiple
              freeSolo
              id="tags-outlined"
              options={top100Films}
              getOptionLabel={(option) => option.title || option}
              value={price}
              onChange={(event, newValue) => setPrice(newValue)}
              filterSelectedOptions
              renderInput={(params) => {
                params.inputProps.onKeyDown = handleKeyDown;
                return (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="filterSelectedOptions"
                    placeholder="Favorites"
                    margin="normal"
                    fullWidth
                  />
                );
              }}
            />
          </Grid> */}

          {/* --img-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="image"
              type="file"
              label="Food Image"
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.image)}
              helperText={errors.image && "Food image is required *"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FiUpload size={25} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                accept: "image/*",
              }}
              {...register("image", { required: true })}
              sx={{
                width: 1,
                "& ::file-selector-button": {
                  display: "none",
                },
              }}
            />
          </Grid>
          {/* --ingredient-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="base_ingredient"
              label="Base Ingredient"
              type="text"
              error={Boolean(errors.base_ingredient)}
              helperText={
                errors.base_ingredient && "This ingredient is required *"
              }
              {...register("base_ingredient", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --detail-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="food_detail"
              label="Details"
              type="text"
              error={Boolean(errors.food_detail)}
              helperText={
                errors.food_detail && "This food details is required *"
              }
              {...register("food_detail", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --test-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="taste"
              label="Taste"
              type="text"
              error={Boolean(errors.taste)}
              helperText={errors.taste && "This taste is required *"}
              {...register("taste", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --review-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="review"
              label="Review"
              type="text"
              error={Boolean(errors.review)}
              helperText={errors.review && "This review is required *"}
              {...register("review", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --package-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="packaging"
              label="Packaging"
              type="number"
              error={Boolean(errors.packaging)}
              helperText={errors.packaging && "This package is required *"}
              {...register("packaging", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --recommend-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="is_recommended"
              label="Recommended"
              type="text"
              error={Boolean(errors.is_recommended)}
              helperText={
                errors.is_recommended && "This recommend is required *"
              }
              {...register("is_recommended", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --category-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <Autocomplete
              options={categories?.map((category) => category?.id)}
              // defaultValue={[topFilms[2].size]}
              filterSelectedOptions
              value={category}
              onChange={(e, value) => setCategory(value)}
              renderInput={(params) => (
                <TextField {...params} label="Select Size" />
              )}
            />
          </Grid>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
            >
              Create
            </button>
            <button
              onClick={handleModalCloseTwo}
              className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AddFoodItem;
