import PokemonList from "@app/pages/PokemonList"
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import "@app/index.css"
import PokemonDetail from "./pages/PokemonDetail";
import UpdatePokemon from "./pages/UpdatePokemon";

function App() {

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "", element: <PokemonList /> },
        { path: "pokemon/:pokemonId/", element: <PokemonDetail />},
        { path: "pokemon/:pokemonId/update", element: <UpdatePokemon />}
      ],
    },
  ]);

  return <>{routes}</>;
}

export default App;
