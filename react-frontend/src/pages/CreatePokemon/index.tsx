import MultiSelect from "@app/components/MultiSelect";
import { useFormik } from "formik";
import { typeOptions } from "@app/common/constants";
import Button from "@app/components/Button";
import { useNavigate } from "react-router-dom";
import { BasicObject } from "@app/common/types";
import { postRequest } from "@app/api/axiosService";

const CreatePokemon = () => {
  const url = "http://localhost:8000/pokemon/";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      types: [],
      weight: 0,
      height: 0,
      image_url: "",
    },
    onSubmit: (values) => {
      postRequest(url, values).then((res) => {
        if (res.status === 201) {
          navigate(`/pokemon/${res.data.id}/`);
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
        <span className="font-bold text-lg">CREATE NEW POKEMON</span>
        <div>
          <label htmlFor="username">Pokemon Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            required
          />
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
          {formik.touched.types && formik.errors.types && (
            <p className="text-red-500 text-xs ml-4 mt-1">
              {formik.errors.types}
            </p>
          )}
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
            required
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
            required
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
            required
          />
        </div>
        <br />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreatePokemon;
