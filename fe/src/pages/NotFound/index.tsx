import img from "../../assets/nopage.png"
const NotFound = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div>
        {/* <h1 className="text-white">hi there</h1> */}
        <img src={img} className="w-[90%] "></img>
      </div>
    </div>
  );
};

export default NotFound;
