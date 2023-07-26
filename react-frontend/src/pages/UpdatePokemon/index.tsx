import MultiSelect from "@app/components/MultiSelect";
import { useFormik } from "formik";
import { typeOptions } from "@app/common/constants";
import { useEffect, useState } from "react";
import Button from "@app/components/Button";
import { BasicObject } from "@app/common/types";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "@app/api/axiosService";
import { Pokemon } from "../PokemonDetail";
import { removeFalsyKeys } from "@app/common/utils";

const UpdatePokemon = () => {
  let { pokemonId } = useParams();
  const url = `http://localhost:8000/pokemon/${pokemonId}/`;
  const [pokemon, setPokemon] = useState<Pokemon>();
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    getRequest(url, {
      signal: controller.signal,
    }).then((res) => {
      setPokemon(res.data);
    });

    // Cancel old request connection on re-request
    return () => controller.abort();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      types: [],
      weight: 0,
      height: 0,
      image_url: "",
    },
    onSubmit: (values) => {
      const payload = removeFalsyKeys(values);
      patchRequest(url, payload).then((res) => {
        if (res.status === 200) {
          navigate(`/pokemon/${pokemonId}/`);
        }
        formik.setErrors(res.data);
      });
    },
  });

  const handleSelectionChange = (selectedOptions: string[]) => {
    let pokemonTypes: BasicObject[] = [];

    selectedOptions.forEach((pokemonType) => {
      pokemonTypes.push({ type: pokemonType });
    });

    formik.setFieldValue("types", pokemonTypes);
  };

  return (
    <div className="min-w-[50vw] max-w-[50vw] flex flex-col self-center z-10 font-pokemon">
      <Button onClick={() => navigate(-1)} className="w-1 mt-12">
        Back
      </Button>
      <form
        className="mt-5 space-y-10 rounded-md p-7 border-2 border-blue-700"
        onSubmit={formik.handleSubmit}
      >
        <span className="font-bold text-lg">
          UPDATE {pokemon?.name.toUpperCase()}
        </span>
        <div>
          <label htmlFor="username">Pokemon Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {/* Just to show sample API validation, falsy input values are trimmed anyways */}
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs ml-4 mt-1">
              {formik.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="pokemonTypes">Pokemon Types</label>
          <MultiSelect
            onSelectionChange={handleSelectionChange}
            options={typeOptions}
          />
        </div>
        <div>
          <label htmlFor="height">Pokemon Height</label>
          <input
            type="number"
            id="height"
            name="height"
            onChange={formik.handleChange}
            value={formik.values.height}
            min={0}
          />
        </div>
        <br />
        <div>
          <label htmlFor="weight">Pokemon Weight</label>
          <input
            type="number"
            id="weight"
            name="weight"
            onChange={formik.handleChange}
            value={formik.values.weight}
            min={0}
          />
        </div>
        <br />
        <div>
          <label htmlFor="image_url">Pokemon Image URL</label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            onChange={formik.handleChange}
            value={formik.values.image_url}
          />
        </div>
        <br />
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
};

export default UpdatePokemon;
