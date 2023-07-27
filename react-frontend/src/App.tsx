import PokemonList from "@app/pages/PokemonList";
import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import "@app/index.css";
import PokemonDetail from "./pages/PokemonDetail";
import UpdatePokemon from "./pages/UpdatePokemon";
import CreatePokemon from "./pages/CreatePokemon";

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
      children: [
        { path: "", element: <PokemonList /> },
        { path: "pokemon/:pokemonId/", element: <PokemonDetail /> },
        { path: "pokemon/:pokemonId/update", element: <UpdatePokemon /> },
        { path: "pokemon/create", element: <CreatePokemon /> },
      ],
    },
  ]);

  return <>{routes}</>;
}

export default App;
