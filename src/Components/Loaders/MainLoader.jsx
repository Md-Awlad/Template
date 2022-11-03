import LoaderSource from "./LoaderSource";

const MainLoader = () => {
  const loaderStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  };
  return (
    <div style={loaderStyle}>
      {/* <img className="w-20" src={Infinity} alt="Loading..." /> */}
      <LoaderSource />
      {/* <CircularProgress
        sx={{
          color: "#000",
        }}
        size={100}
      /> */}
    </div>
  );
};

export default MainLoader;
