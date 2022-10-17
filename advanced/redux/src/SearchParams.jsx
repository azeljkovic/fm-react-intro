import { useEffect, useState } from "react";
import useBreedList from "./useBreedList.js";
import Results from "./Results.jsx";
import { useDispatch, useSelector } from "react-redux";
import changeAnimal from "./actionCreators/changeAnimal";
import changeBreed from "./actionCreators/changeBreed";
import changeLocation from "./actionCreators/changeLocation";
import changeTheme from "./actionCreators/changeTheme";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const animal = useSelector(state => state.animal);
  const location = useSelector(state => state.location);
  const breed = useSelector(({ breed }) => breed);
  const theme = useSelector(state => state.theme);
  const dispatch = useDispatch();

  const [breeds] = useBreedList(animal);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    void requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          void requestPets();
        }}
      >
        <label htmlFor="location">
          Location {location}
          <input id="location" value={location} placeholder="Location"
                 onChange={(e) => dispatch(changeLocation(e.target.value))} />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal"
                  value={animal}
                  onChange={(e) => {
                    dispatch(changeAnimal(e.target.value));
                  }}
                  onBlur={(e) => {
                    dispatch(changeAnimal(e.target.value));
                  }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => {
              dispatch(changeBreed(e.target.value));
            }}
            onBlur={(e) => {
              dispatch(changeBreed(e.target.value));
            }}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="theme">
          Theme
          <select
            value={theme}
            onChange={e => dispatch(changeTheme(e.target.value))}
            onBlur={e => dispatch(changeTheme(e.target.value))}
          >
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="gray">Gray</option>
            <option value="orange">Orange</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
