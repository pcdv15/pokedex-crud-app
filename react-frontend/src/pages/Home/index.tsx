import { Outlet } from "react-router-dom";
import pokeball from "@app/assets/pokeball.svg";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto flex flex-col">
        <img className="custom-bg" src={pokeball} alt="pokeball" />
        <span
          onClick={() => {
            navigate("/");
          }}
          className="text-6xl font-bold self-center font-pokemon text-center cursor-pointer"
        >
          Pokédex
        </span>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
