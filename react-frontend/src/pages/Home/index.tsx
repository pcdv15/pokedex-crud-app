import { Outlet } from "react-router-dom";
import pokeball from "@app/assets/pokeball.svg";
import "./index.css";

const Home = () => {
  return (
    <div className="min-h-screen bg-blue-100">
      <div className="container mx-auto flex flex-col">
        <img className="custom-bg" src={pokeball} alt="pokeball" />
        <span className="text-6xl font-bold self-center font-pokemon text-center">
          Pokédex 
        </span>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
