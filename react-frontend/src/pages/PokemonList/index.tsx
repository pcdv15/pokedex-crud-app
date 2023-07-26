import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteRequest, getRequest } from "@app/api/axiosService";
import ListItem from "@app/components/ListItem";
import BasicPagination from "@app/components/BasicPagination";
import MenuDropdown from "@app/components/MenuDropdown";
import Loading from "@app/components/Loading";
import Button from "@app/components/Button";

interface Pokemon {
  id: number;
  name: string;
}

const PokemonList = () => {
  const listUrl = "http://localhost:8000/pokemon/";
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(listUrl);
  const [prevPage, setPrevPage] = useState<any>();
  const [nextPage, setNextPage] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    getRequest(currentPage, { signal: controller.signal }).then((res) => {
      setIsLoading(false);
      setPokemons(res.data.results);
      setPrevPage(res.data.previous);
      setNextPage(res.data.next);
      setRefresh(false);
    });
    // Cancel old request connection on re-request
    return () => controller.abort();
  }, [currentPage, refresh]);

  function gotoNextPage() {
    setCurrentPage(nextPage);
  }

  function gotoPrevpage() {
    setCurrentPage(prevPage);
  }

  function gotoPokemon(id: number) {
    navigate(`/pokemon/${id}/`);
  }

  function deletePokemon(id: number) {
    deleteRequest(`http://localhost:8000/pokemon/${id}/`).then((res) => {
      if (res.status === 204) {
        setPokemons((pokemon) => [
          ...pokemon.filter((p: Pokemon) => p.id !== id),
        ]);
        setCurrentPage(listUrl);
        setRefresh(true);
      }
    });
  }

  if (isLoading) return <Loading className="self-center mt-40" />;

  return (
    <>
      <Button className="self-center mt-10">Create New Pokemon</Button>
      <div className="self-center mt-16 z-10">
        {pokemons.map((p: Pokemon) => (
          <ListItem label={p.name} onClick={() => gotoPokemon(p.id)} key={p.id}>
            <MenuDropdown
              id={p.id}
              onClickDelete={() => deletePokemon(p.id)}
              className="z-20"
            />
          </ListItem>
        ))}
      </div>
      <BasicPagination
        className={"self-center"}
        gotoNextPage={nextPage ? gotoNextPage : null}
        gotoPrevPage={prevPage ? gotoPrevpage : null}
      />
    </>
  );
};

export default PokemonList;
