import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getRequest } from "@app/api/axiosService";
import { capitalize } from "lodash";
import Loading from "@app/components/Loading";
import typeColors from "@app/common/constants";
import Button from "@app/components/Button";

interface PokemonType {
  type: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  image_url: string;
  types: PokemonType[];
}

const PokemonDetail = () => {
  let { pokemonId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const navigate = useNavigate();
  const location = useLocation();
  location.state;

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    getRequest(`http://localhost:8000/pokemon/${pokemonId}`, {
      signal: controller.signal,
    }).then((res) => {
      setIsLoading(false);
      setPokemon(res.data);
    });

    // Cancel old request connection on re-request
    return () => controller.abort();
  }, []);

  if (isLoading) return <Loading className="self-center mt-40" />;

  return (
    <div className="min-w-[50vw] flex flex-col self-center z-10">
      <Button onClick={() => navigate(-1)} className="w-1 mt-12">
        Back
      </Button>
      {/* Probably will move this to a new card component */}
      <div className="flex flex-col self-center mt-20 font-pokemon relative border-solid border-2 border-slate-600 p-10 rounded-lg bg-[rgba(0,0,0,0.2)]">
        <div
          className="h-[10.5rem] w-[10.5rem] rounded-md bg-gradient-to-r 
      from-orange-400 via-55% to-yellow-300 p-1 animate-border self-center relative"
        >
          <img
            className="rounded-md w-40 h-40 bg-gray-500"
            src={pokemon?.image_url}
            alt="Pokemon Image"
          />
        </div>

        <span className="font-bold text-2xl self-center mt-7 p-1 relative">
          <span className="absolute -top-5 left-0 text-[8px] p-1 max-w-min z-10">
            No{pokemon?.id}
          </span>
          {capitalize(pokemon?.name)}
        </span>
        <br />
        <span className="self-center">
          {pokemon?.types.map((type, index) => (
            <span
              style={{ backgroundColor: typeColors[`${type.type}`] }}
              className="text-[8px] p-1 rounded-md m-1"
              key={index}
            >
              {type.type.toUpperCase()}
            </span>
          ))}
        </span>
        <br />
        <span>
          <b>Height:</b> {pokemon?.height}m
        </span>
        <span>
          <b>Weight:</b> {pokemon?.weight}kg
        </span>
      </div>
    </div>
  );
};

export default PokemonDetail;
