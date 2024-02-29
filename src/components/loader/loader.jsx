import { TailSpin } from "react-loader-spinner";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loaderContainer">
      <TailSpin
        arialLabel="loading-indicator"
        color="#8ec5fc"
        heigth="40px"
        width="40px"
      />
    </div>
  );
};

export default Loader;
