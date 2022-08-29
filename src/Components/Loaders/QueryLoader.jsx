import gif from "../../image/loader/loader.gif";

const QueryLoader = () => {
  const loaderStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  };
  return (
    <div style={loaderStyle}>
      <img className="w-20" src={gif} alt="Loading..." />
      {/* <CircularProgress
        sx={{
          color: "#000",
        }}
        size={100}
      /> */}
    </div>
  );
};

export default QueryLoader;
