import React, { useEffect } from "react";
import Select from "react-select";
import { fetchAllAbilities } from "../util/fetchPokemonData";
import allTypes  from "../util/allTypes";
import SortTypes from "../util/SortTypes";

function Filter({
  selectTypeOption,
  setSelectTypeOption,
  selectAbilityOptions,
  setSelectAbilityOption,
  abilityOptions,
  setAbilityOptions,
  setSortType,
}) {
  // handler for Type drop-down
  const handleTypeChange = (selectTypeOption) => {
    setSortType(SortTypes.TYPE);
    setSelectTypeOption(selectTypeOption.value);
  };
  // handler for Abilities drop-down
  const handleAbilityChange = (selectAbilityOption) => {
    setSortType(SortTypes.ABIL);
    setSelectAbilityOption(selectAbilityOption.value);
  };

  // get all Abilities and save data to hook
  const getAllAbilities = async () => {
    try {
      // data: array of objects with keys: "name" and "url"
      const data = await fetchAllAbilities();

      // abiliObj: array of choice objects with "value" and "label"(capitalized) for drop-down
      const abiliObjs = data.map((obj) => {
        const name = obj["name"];
        const choice = {
          value: name,
          label: name[0].toUpperCase() + name.slice(1),
        };
        return choice;
      });
      // sort array of objects by "value" key alphabetically
      const sortedAbilities = abiliObjs.sort((a, b) => {
        const nameA = a["value"].toUpperCase();
        const nameB = b["value"].toUpperCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      // store sorted ability options array into state variable: abilityOptions
      setAbilityOptions(sortedAbilities);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetch all abilities
    getAllAbilities();
  }, []);

  return (
    <div className="filterBar">
      <div>
        <Select
          className="filterDropDown"
          onChange={handleTypeChange}
          options={allTypes}
          placeholder="Select Type"
        />
      </div>
      <Select
        placeholder="Select Ability"
        className="filterDropDown"
        onChange={handleAbilityChange}
        options={abilityOptions}
      />
      <button onClick={() => setSortType(SortTypes.ABC)}>A-Z</button>
      <button onClick={() => setSortType(SortTypes.HEIGHT)}>Height</button>
      <button onClick={() => setSortType(SortTypes.WEIGHT)}>Weight</button>
      <button onClick={() => setSortType(SortTypes.DEX_NO)}>Dex No.</button>
    </div>
  );
}

export default Filter;
